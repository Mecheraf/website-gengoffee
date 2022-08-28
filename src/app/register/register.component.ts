import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public showText:boolean = false;
  public otherText: String = "";
  constructor() { }

  ngOnInit(): void {
  }

  dietList:String[] = []
  languagesList:String[] = ["fr", "jp", "en"]
  
  toggleDiet (diet:String) {
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

  }

  removeLanguage(){

  }

  

}
