import { Component, OnInit } from '@angular/core';

interface formParams {
  type:string,
  date:Date,
  place:string
}

@Component({
  selector: 'app-createevent',
  templateUrl: './createevent.component.html',
  styleUrls: ['./createevent.component.css']
})


export class CreateeventComponent implements OnInit {

  constructor() { }
  public type:string ="";
  public date:Date = new Date();
  public place:string ="";


  public formGroup = {} as formParams;

  ngOnInit(): void {
  }

  submitForm(){
    this.formGroup.type = this.type
    this.formGroup.date = this.date
    this.formGroup.place = this.place
    console.log(this.formGroup)
  }

}
