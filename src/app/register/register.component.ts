const NEXT_EVENTS = 3

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { EventService } from '../services/event.service';
import { RegisterService } from '../services/register.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Meta } from '@angular/platform-browser';



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
    name: new FormControl<string>('', [Validators.required]),
    mail: new FormControl<string>('', [Validators.required]),
    phone: new FormControl<string>(''),
    selectedLanguages: new FormControl<userLanguage[]>({} as userLanguage[]),
    dietList: new FormControl<string[]>([]),
  });
  public events:any;
  public nextEvents:any[] = [];
  public selectedEvent:string = "0";
  public warning = 1;
  public location = 0; //Setup as Paris

  constructor(
    private eventservice: EventService,
    private registerservice:RegisterService,
    private translateService: TranslateService,
    public _snackBar: MatSnackBar,
    private meta: Meta
    ) {
  }

  ngOnInit(): void {
    this.allTags()
    this.getNextEvents(NEXT_EVENTS, 0, "PARIS");
    this.getNextEvents(NEXT_EVENTS, 1, "TOKYO");
  }

  getNextEvents(limit:number, position:number, location:string) {
    this.eventservice.getNextEvents({params:{limit: limit, location:location}}).subscribe((data) => {
      this.nextEvents[position] = data;
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


  selectEvent(id:string) {
    this.selectedEvent = id;
    for(let event in this.nextEvents){
      if(this.nextEvents[event].id === id){
        if(this.nextEvents[event].subscribe === 0){
          this.warning = 0
        } else {
          this.warning = 1
        }
      }
    }
  }

  allTags(){
    this.meta.updateTag({ name: 'title', content: 'Inscrivez-vous à nos échanges linguistique Gengoffee'});
    this.meta.updateTag({ name: 'description', content: 'Participer aux différents événements échange de langue Gengoffee'});
  } 
   
  selectLocation(location:number) {
    this.location = location;
  }
  
}
