import { Component, OnInit } from '@angular/core';

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
  public number:string ="";
  
  public formGroup = {} as formParams;

  constructor() { }

  ngOnInit(): void {
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
    this.formGroup.selectedLanguages = this.selectedLanguages
    this.formGroup.dietList = this.dietList
    console.log(this.formGroup)
  }

}
