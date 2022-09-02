const NEXT_EVENTS = 3

import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { RegisterService } from '../services/register.service';

interface userLanguage {
  language: string,
  level: string,
}

interface formParams {
  name:string,
  mail:string,
  phone:string,
  dietList: string[],
  selectedLanguages: userLanguage[]
}
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  public languages: string[] = ["fr", "jp", "en"];
  public selectedLanguages: userLanguage[] = [];
  dietList: string[] = []

  public showText:boolean = false;
  public otherText:string = "";
  public name:string ="";
  public mail:string ="";
  public phone:string ="";

  
  public formGroup = {} as formParams;
  public events:any;
  public nextEvents:any;

  constructor(private eventservice: EventService, private registerservice:RegisterService) { }

  ngOnInit(): void {
    this.getNextEvents(NEXT_EVENTS)
  }



  getNextEvents(limit:number) {
    this.eventservice.getNextEvents({params:{nextEvents: limit}}).subscribe((data) => {
      this.nextEvents = data;
    })
  }

  toggleDiet (diet: string) {
    if (this.dietList.includes(diet)) {
      this.dietList = this.dietList.filter(obj => diet !== obj);
    }
    else {
      this.dietList.push(diet)
    }
    console.log(this.dietList)
  } 

  toggleOther(){
    this.showText = !this.showText;
    console.log(this.otherText)
  }

  addLanguage(){
    const language: userLanguage = {language: "fr", level: "lv1"};
    this.selectedLanguages.push(language);
    console.log(this.selectedLanguages);
  }

  removeLanguage(language: userLanguage){
    this.selectedLanguages.splice(this.selectedLanguages.indexOf(language), 1);
  }

  submitForm(){
    this.dietList.push(this.otherText)
    this.formGroup.name = this.name
    this.formGroup.mail = this.mail
    this.formGroup.phone = this.phone
    this.formGroup.selectedLanguages = this.selectedLanguages
    this.formGroup.dietList = this.dietList
    console.log(this.formGroup)
    this.registerservice.post(this.formGroup).subscribe()
  }

}
