import { ListKeyManager } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { __values } from 'tslib';

interface registeredUser {
  firstName:string,
  lastName:string,
  language:string[],
  diet:string[]
}

interface eventsList {
  id:number,
  date:Date,
  registeredList:registeredUser[]
}

@Component({
  selector: 'app-registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.css']
})
export class RegisteredComponent implements OnInit {

  public today = new Date()
  public nextEvent = 0;
 
  public alanUser:registeredUser = {
    firstName:"Alan",
    lastName:"Mecheraf",
    language:["3","3","1"],
    diet:[]
  }

  public mayuUser:registeredUser = {
    firstName:"Mayu",
    lastName:"Koketsu",
    language:["2","1","3"],
    diet:["Vegetarian"]
  }
  
  public salimUser:registeredUser = {
    firstName:"Salim",
    lastName:"Baroudi",
    language:["3","2","1"],
    diet:["Halal"]
  }
  
  public steveUser:registeredUser = {
    firstName:"Steve",
    lastName:"Michiels",
    language:["3","1","1"],
    diet:["Gros noyau"]
  }
  
  public brandonUser:registeredUser = {
    firstName:"Brandon",
    lastName:"Martins",
    language:["3","2","1"],
    diet:["Vegetarian"]
  }

  public registeredList1: registeredUser[] = [this.mayuUser, this.alanUser];
  public registeredList2: registeredUser[] = [this.alanUser, this.salimUser, this.steveUser, this.brandonUser];



  public events:eventsList[] = [
    {id:51, date:new Date("2022-11-20"), registeredList:this.registeredList1}, 
    {id:52, date: new Date("2022-11-27"), registeredList:this.registeredList2},
    {id:53, date: new Date("2022-12-04"), registeredList:this.registeredList2},
    {id:53, date: new Date("2022-12-04"), registeredList:this.registeredList2},
    {id:53, date: new Date("2022-12-04"), registeredList:this.registeredList2},
    {id:53, date: new Date("2022-12-04"), registeredList:this.registeredList2},
    {id:53, date: new Date("2022-12-04"), registeredList:this.registeredList2},
    {id:53, date: new Date("2022-12-04"), registeredList:this.registeredList2}
  ];

  constructor() { }

  ngOnInit(): void {
    this.getNextEvent(this.events);
  }

  private getNextEvent(listEvents:eventsList[]){
    let i = 0;
    while( i < listEvents.length && listEvents[i].date < this.today){
      i++
    }
    this.nextEvent = i;
  }

}
