const NEXT_EVENTS = 3

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Event } from '../models/event';
import { EventService } from '../services/event.service';
import { RegisterService } from '../services/register.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


interface userLanguage {
  language: string,
  level: string,
}
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  public languages: string[] = ["fr", "jp", "en"];

  public showText:boolean = false;
  public otherText:string = "";
  public selectedLanguages: userLanguage[] = [];

  public registerForm: FormGroup = new FormGroup({
    id_event: new FormControl<string>(''),
    name: new FormControl<string>(''),
    mail: new FormControl<string>(''),
    phone: new FormControl<string>(''),
    selectedLanguages: new FormControl<userLanguage[]>({} as userLanguage[]),
    dietList: new FormControl<string[]>([]),
  });
  public events:any;
  public nextEvents:any;
  public selectedEvent:any = 0;

  constructor(
    private eventservice: EventService,
    private registerservice:RegisterService,
    private translateService: TranslateService,
    public _snackBar: MatSnackBar
    ) {
  }

  ngOnInit(): void {
    this.getNextEvents(NEXT_EVENTS);
  }

  getNextEvents(limit:number) {
    this.eventservice.getNextEvents({params:{limit: limit}}).subscribe((data) => {
      this.nextEvents = data;
      if(window.history.state?.id) {
        this.switchEvent(window.history.state.id);
      } 
    })
  }

  toggleDiet (selectedDiet: string) {
    
    const dietList: string[] = this.registerForm.get('dietList')?.value as string[];
    if (this.registerForm.get('dietList')?.value.includes(selectedDiet)) {
      this.registerForm.patchValue({'dietList': dietList.filter(diet => selectedDiet !== diet)});
    }
    else {
      dietList.push(selectedDiet);
      this.registerForm.patchValue({'dietList': dietList});
    }
  } 

  toggleOther(){
    this.showText = !this.showText;
  }

  addLanguage(){
    if (this.selectedLanguages.length >= 3) return;
    const language: userLanguage = {language: "fr", level: "lv1"};
    this.selectedLanguages.push(language);
  }

  removeLanguage(language: userLanguage){
    this.selectedLanguages.splice(this.selectedLanguages.indexOf(language), 1);
  }

  onSubmit(){
    const validConfigSnack = new MatSnackBarConfig();
    validConfigSnack.panelClass = ['valid-snackbar'];
    validConfigSnack.horizontalPosition = 'center';
    const invalidConfigSnack = new MatSnackBarConfig();
    invalidConfigSnack.panelClass = ['invalid-snackbar'];
    invalidConfigSnack.horizontalPosition = 'center';
    const name:string = this.registerForm.get('name')?.value;
    const mail:string = this.registerForm.get('mail')?.value;



    if(name.length === 0  || mail.length === 0){
      this._snackBar.open(this.translateService.instant('errorRegister'), "Fermer", invalidConfigSnack);
      console.log("Failed")
    } else {
      const dietList: string[] = this.registerForm.get('dietList')?.value as string[];
      dietList.push(this.otherText);
      this.registerForm.patchValue({'id_event':this.selectedEvent});
      this.registerForm.patchValue({'dietList': dietList});
      this.registerForm.patchValue({'selectedLanguages': this.selectedLanguages});
      this.registerservice.post(this.registerForm.value).subscribe();
      this.registerForm.reset();
      this.selectedLanguages = [];
      this._snackBar.open(this.translateService.instant('registered'), "Fermer", validConfigSnack);
    }
  }

  switchEvent(id: string) {
    this.nextEvents.map((event: Event, index: number) => {
      if (event.id === id) {
        this.nextEvents[index] = this.nextEvents[0];
        this.nextEvents[0] = event;
      }
    });
  }

  selectEvent(id:string) {
    this.selectedEvent = id;
  }
  
}
