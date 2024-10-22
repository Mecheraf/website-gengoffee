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

  //public languages: string[] = ["fr", "jp", "en"];

  public showText:boolean = false;
  public otherText:string = "";
  public selectedLanguages: userLanguage[] = [];

  public registerForm: FormGroup = new FormGroup({})

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

  initForm(){
    this.registerForm = new FormGroup({
      idEvent: new FormControl<string>(''),
      lastname: new FormControl<string>(''),
      firstname: new FormControl<string>(''),
      mail: new FormControl<string>('', [Validators.required]),
      phone: new FormControl<string>(''),
      selectedLanguages: new FormControl<userLanguage[]>({} as userLanguage[]),
      dietList: new FormControl<string[]>([]),
    });
  }

  ngOnInit(): void {
    this.allTags()
    this.initForm()
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

  // addLanguage(){
  //   if (this.selectedLanguages.length >= 3) return;
  //   const language: userLanguage = {language: this.languages[0], level: "1"};
  //   this.selectedLanguages.push(language);
  //   this.languages.shift()
  // }

  // removeLanguage(language: userLanguage){
  //   this.languages.unshift(language.language)
  //   this.selectedLanguages.splice(this.selectedLanguages.indexOf(language), 1);
  // }

  onSubmit(){
    const validConfigSnack = new MatSnackBarConfig();
    validConfigSnack.panelClass = ['valid-snackbar'];
    validConfigSnack.horizontalPosition = 'center';
    const invalidConfigSnack = new MatSnackBarConfig();
    invalidConfigSnack.panelClass = ['invalid-snackbar'];
    invalidConfigSnack.horizontalPosition = 'center';
    const firstname:string = this.registerForm.get('firstname')?.value;
    const mail:string = this.registerForm.get('mail')?.value;

    if(this.selectedEvent === "0" || mail.length === 0){
      this._snackBar.open(this.translateService.instant('errorRegister'), "Fermer", invalidConfigSnack);
    } else {
      this.registerForm.patchValue({'idEvent':this.selectedEvent});
      this.registerForm.patchValue({'dietList': this.registerForm.get('dietList')?.value});
      this.registerForm.patchValue({'selectedLanguages': this.selectedLanguages});
      this.registerservice.post(this.registerForm.value).subscribe();
      this.initForm()
      this.selectedLanguages = [];
      this._snackBar.open(this.translateService.instant('registered'), "Fermer", validConfigSnack);
    }
  }

  public checkLanguage(language:string, languages:userLanguage[]){
    for(let element of languages){
      if(element.language === language){
        return true
      }
    }
    return false
  }


  selectEvent(id:string) {
    this.selectedEvent = id;
    for(let city in this.nextEvents){ //For the city
      for(let event in this.nextEvents[city]){
        if(this.nextEvents[city][event].id === id){
          if(this.nextEvents[city][event].type == "karaoke"){
            this.warning = 0
          } else {
            this.warning = 1
          }
        }
      }
    }
    console.log(this.warning)
  }

  allTags(){
    this.meta.updateTag({ name: 'title', content: 'Inscrivez-vous à nos échanges linguistique Gengoffee'});
    this.meta.updateTag({ name: 'description', content: 'Participer aux différents événements échange de langue Gengoffee'});
  }

  selectLocation(location:number) {
    this.location = location;
  }

}
