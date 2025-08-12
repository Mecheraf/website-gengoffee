import { Component, OnInit } from '@angular/core';
import { __values } from 'tslib';
import { RegisteredService } from '../services/registered.service';
import { EventService } from '../services/event.service';
import { switchMap, tap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

interface registeredUser {
  id:number,
  firstname:string,
  lastname:string
  mail:string,
  diet:string[], 
  idEvent:number,
  languages:any,
  date_registered:Date,
  paid:number
}

interface eventsAttendees {
  id:number,
  date:Date,
  type:string,
  location:string,
  place:string,
  registeredList:registeredUser[]
}

interface updatedUser {
  idUser:number,
  idEvent:number,
  paid:number, 
  mail:string,
  date:Date,
  main:string,
  second:string,
  place:string
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
  public updatedList:updatedUser[]  = []

  public events:eventsAttendees[] = [];
  public nbEventFr:number = 3;
  public nbEventJp:number = 2;

  constructor(
    private registeredService: RegisteredService,
    private eventservice: EventService,
    private translateService: TranslateService,
  ) { }

  async ngOnInit() {
    this.registeredService.getRegisteredList().pipe(
      switchMap(()=> {
        return  this.registeredService.getRegisteredList()
      }), 
      tap((registeredList)=>{
        registeredList.forEach((element: any, index:number) => {
          if(element.languages){
            registeredList[index].languages = this.getLanguages(element.languages)
          }
        })
        this.getNextEvent(this.nbEventFr, registeredList, 'PARIS')
        this.getNextEvent(this.nbEventJp, registeredList, 'TOKYO')
      })
    ).subscribe()
  }

  getNextEvent(limit:number, registeredList:any, location:string) {
    this.eventservice.getNextEvents({params:{limit: limit, location:location}}).subscribe((data) => {
      this.nextEvents = data;
      this.nextEvents.forEach((element: any, index:number) => {

        const currentList:any = registeredList.filter((registered: { idEvent: any; }) => 
          registered.idEvent == element.id
        )
        this.events.push({
          id: element.id,
          date: element.date,
          type: element.type,
          location:element.location,
          place:element.place,
          registeredList: currentList
        });
      });
    })
  }

  getRegistered() {
    this.registeredService.getRegisteredList().subscribe((registeredList) => {
      this.registeredList = registeredList
    });
  }

  updateList(indexUser:number, indexEvent:number, paid:number, mail:string, date:Date, location:string, second:string){ //on update la liste des inscrits ou non
    this.events[indexEvent].registeredList[indexUser].paid = -1 - paid  

    let idUser = this.events[indexEvent].registeredList[indexUser].id;
    let idEvent = this.events[indexEvent].id;
    paid = this.events[indexEvent].registeredList[indexUser].paid
    let tmp = 0
    const main:string = location === "PARIS" ? "fr" : "jp"

    this.updatedList.filter((element, index) => { //We check if the pair idUser and idEvent are already entered
        if(idUser === element.idUser && idEvent === element.idEvent){
          this.updatedList.splice(index, 1)
          tmp = 1
        }
      }
    )
    if(!tmp){ //If we didnt change it, we just change the value.
      this.updatedList.push({idUser, idEvent, paid, mail, date, main, second, place:this.events[indexEvent].place + " - " + this.events[indexEvent].location })
    }
  }

  updateAttendee(){
    this.registeredService.updateAttendee({"attendees":this.updatedList, "mail":1}).subscribe()
    this.updatedList = []
  }
  
  public getColorByCountry(eventType:string): string {
    if (eventType === 'jp' || eventType === 'fr') {
      return "gengoffee-lightred-bg";
    }
    
    return "gengoffee-lightblue-bg";
  }

  public getTranslatedDate(theDate:Date) {
    const eventDate = new Date(theDate);
    const translatedDay = this.translateService.instant('days.' + eventDate.getDay().toString());
    const translatedMonth = this.translateService.instant('months.' + eventDate.getMonth().toString());
    const dayNumber = eventDate.getDate();
    const year = eventDate.getFullYear();

    return this.translateService.instant('fullDate', {day: translatedDay, month: translatedMonth, dayNumber: dayNumber, year: year });
  }

  public getLanguages(languages:string){
    let result = JSON.parse(languages)
    result.forEach((element:any, index:number) => {
      switch(element.language) {
        case 1:
          result[index].language = "fr"
          break;
        case 2:
          result[index].language = "en"
          break;
        case 3:
          result[index].language = "jp"
          break;
      }
    });
    return result
  }

}
