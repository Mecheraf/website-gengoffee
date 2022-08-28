import { Component, OnInit } from '@angular/core';

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
  public selectedLanguages: userLanguage[] = [];
  dietList: string[] = []

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

  addLanguage(){
    const language: userLanguage = {language: "fr", level: "lv1"};
    this.selectedLanguages.push(language);
    console.log(this.selectedLanguages);
  }

  removeLanguage(language: userLanguage){
    this.selectedLanguages.splice(this.selectedLanguages.indexOf(language), 1);
  }

}
