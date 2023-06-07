import { ListKeyManager } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { __values } from 'tslib';
import { RegisteredService } from '../services/registered.service';
import { EventService } from '../services/event.service';


interface registeredUser {
  firstName:string,
  lastName:string,
  language:string[],
  diet:string[]
}

interface eventsAttendees {
  id:number,
  date:Date,
  type:string,
  registeredList:registeredUser[]
}



@Component({
  selector: 'app-registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.css']
})
export class RegisteredComponent implements OnInit {



  public today = new Date()
  public nextEvents:any;
  public registeredList: any = [];
  public events:eventsAttendees[] = [];
 
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



  // public events:eventsAttendees[] = [
  //   {id:51, date:new Date("2022-11-20"), registeredList:this.registeredList1}, 
  //   {id:52, date: new Date("2022-11-27"), registeredList:this.registeredList2},
  //   {id:53, date: new Date("2022-12-04"), registeredList:this.registeredList2},
  //   {id:53, date: new Date("2022-12-04"), registeredList:this.registeredList2},
  //   {id:53, date: new Date("2022-12-04"), registeredList:this.registeredList2},
  //   {id:53, date: new Date("2022-12-04"), registeredList:this.registeredList2},
  //   {id:53, date: new Date("2022-12-04"), registeredList:this.registeredList2},
  //   {id:53, date: new Date("2022-12-04"), registeredList:this.registeredList2}
  // ];

  constructor(
    private registeredService: RegisteredService,
    private eventservice: EventService,

  ) { }



  ngOnInit(): void {
    this.getRegistered();
    this.getNextEvent(3);
  }

  getNextEvent(limit:number) {
    this.eventservice.getNextEvents({params:{limit: limit}}).subscribe((data) => {
      this.nextEvents = data;
      console.log(this.nextEvents)
      this.nextEvents.forEach((element: any, index:number) => {
        this.events[index] = {
          id: element.id,
          date: element.date,
          type: element.type,
          registeredList: this.registeredList
        } ;
        console.log(element.id);       
      });
      console.log(this.events);
    })
  }

  private getRegistered(): void {
    this.registeredService.getEventAttendees().subscribe((registeredList) => {
      this.registeredList = registeredList;
    });
  }

  public DisplayList(){
    console.log(this.registeredList)
  }
  
}
