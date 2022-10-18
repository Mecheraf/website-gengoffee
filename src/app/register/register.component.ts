const NEXT_EVENTS = 3

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EventService } from '../services/event.service';
import { RegisterService } from '../services/register.service';

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
    name: new FormControl<string>(''),
    mail: new FormControl<string>(''),
    phone: new FormControl<string>(''),
    selectedLanguages: new FormControl<userLanguage[]>({} as userLanguage[]),
    dietList: new FormControl<string[]>([]),
  });
  public events:any;
  public nextEvents:any;

  constructor(private eventservice: EventService, private registerservice:RegisterService) { }

  ngOnInit(): void {
    this.getNextEvents(NEXT_EVENTS)
  }

  getNextEvents(limit:number) {
    this.eventservice.getNextEvents({params:{limit: limit}}).subscribe((data) => {
      this.nextEvents = data;
    })
  }

  toggleDiet (selectedDiet: string) {
    const dietList: string[] = this.registerForm.get('dietList')?.value as string[];
    if(selectedDiet === "None"){
      dietList.splice(0, 4)
      this.toggleOther()
    }
    else if (this.registerForm.get('dietList')?.value.includes(selectedDiet)) {
      this.registerForm.patchValue({'dietList': dietList.filter(diet => selectedDiet !== diet)});
    }
    else {
      dietList.push(selectedDiet);
      this.registerForm.patchValue({'dietList': dietList});
    }
    console.log(dietList)
  } 

  toggleOther(){
    this.showText = !this.showText;
  }

  addLanguage(){
    const language: userLanguage = {language: "fr", level: "lv1"};
    this.selectedLanguages.push(language);
  }

  removeLanguage(language: userLanguage){
    this.selectedLanguages.splice(this.selectedLanguages.indexOf(language), 1);
  }

  onSubmit(){
    const dietList: string[] = this.registerForm.get('dietList')?.value as string[];
    dietList.push(this.otherText);
    this.registerForm.patchValue({'dietList': dietList});

    this.registerForm.patchValue({'selectedLanguages': this.selectedLanguages});
    this.registerservice.post(this.registerForm.value).subscribe();
    this.registerForm.reset();
    this.selectedLanguages = [];
  }

}
