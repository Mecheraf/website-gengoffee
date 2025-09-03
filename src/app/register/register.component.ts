import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { EventService } from '../services/event.service';
import { RegisterService } from '../services/register.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Meta } from '@angular/platform-browser';
import { SharedDataService } from '../shared/shared-data/shared-data.service';
import { GtmService } from '../services/gtm.service';


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

  public showText:boolean = false;
  public otherText:string = "";
  public selectedLanguages: userLanguage[] = [];

  public registerForm: FormGroup = new FormGroup({})

  public selectedEvent:string = "0";
  public subscribe = 1;
  public warning = 1;
  public location = 'PARIS'; //Setup as Paris
  public place = 'Les Berthom';
  public date = '2025-08-11';
  public types = this.returnType(this.location, 'en');

  constructor(
    private eventservice: EventService,
    private registerservice:RegisterService,
    private translateService: TranslateService,
    public _snackBar: MatSnackBar,
    private meta: Meta,
    public sharedEvents: SharedDataService,
    private gtmService: GtmService
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
      types: new FormControl<string[]>([]),
      place: new FormControl<string>(''),
      date: new FormControl<string>('')
    });
  }

  ngOnInit(): void {
    this.allTags()
    this.initForm()

    this.sharedEvents.getCityEvents("PARIS")
    this.sharedEvents.getCityEvents("TOKYO")
    this.trackMe()
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
      this.gtmService.trackMe('submit-error', 'register', 'submit-error')
      
    } else {
      this.registerForm.patchValue({'idEvent':this.selectedEvent});
      this.registerForm.patchValue({'dietList': this.registerForm.get('dietList')?.value});
      this.registerForm.patchValue({'selectedLanguages': this.selectedLanguages});
      this.registerForm.patchValue({'types':this.types})
      this.registerForm.patchValue({'place':this.place})
      this.registerForm.patchValue({'date':this.date})
      this.registerservice.post(this.registerForm.value).subscribe();
      this.initForm()
      this.selectedLanguages = [];
      this._snackBar.open(this.translateService.instant('registered'), "Fermer", validConfigSnack);
      this.gtmService.trackMe('submit-success', 'register', 'submit-success'+this.location+'-'+this.selectedEvent)
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
    for(let city in this.sharedEvents.next){ //For the city
      for(let event in this.sharedEvents.next[city]){
        if(this.sharedEvents.next[city][event].id === id){
          this.warning = this.sharedEvents.next[city][event].type == "karaoke" ? 0 : 1;
          this.subscribe = this.sharedEvents.next[city][event].subscribe
          this.types = this.returnType(city, this.sharedEvents.next[city][event].type)
          this.place = this.sharedEvents.next[city][event].place + " - " + this.sharedEvents.next[city][event].location
          this.date = this.sharedEvents.next[city][event].date
          this.gtmService.trackMe('form-select-event', 'register', 'event-clicked-' + city + '-' + this.sharedEvents.next[city][event].type)

        }
      }
    }
    
  }

  allTags(){
    this.meta.updateTag({ name: 'title', content: 'Inscrivez-vous à nos échanges linguistique Gengoffee'});
    this.meta.updateTag({ name: 'description', content: 'Participer aux différents événements échange de langue Gengoffee'});
  }

  selectLocation(location:string) {
    this.location = location;
    this.gtmService.trackMe('select-location', 'register', 'select-location'+location)
  }

  returnType(location:string,second:string){
    let main = location === "PARIS" ? "fr" : "jp";
    return [main, second]
  }

  trackMe() {
    this.gtmService.trackMe('page-register', 'register', 'register-page')
  }

  trackMeButton(button:string) {
    this.gtmService.trackMe('register-'+button, 'register', 'register-'+button)
  }

  get returnSliced(){
    return this.sharedEvents.next[this.location]?.slice(0, 3)
  }
}
