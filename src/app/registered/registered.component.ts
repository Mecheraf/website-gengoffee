import { Component, OnInit } from '@angular/core';
import { __values } from 'tslib';
import { RegisteredService } from '../services/registered.service';
import { EventService } from '../services/event.service';
import { switchMap, tap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';



interface registeredUser {
  firstname:string,
  lastname:string
  mail:string,
  diet:string[], 
  idEvent:number,
  languages:any
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
  styleUrls: ['./registered.component.css'],
  providers: [DatePipe]
})
export class RegisteredComponent implements OnInit {


  public today = new Date()
  public nextEvents:any;
  public registeredList: any = [];
  public events:eventsAttendees[] = [];
  public nbEventFr:number = 3;
  public nbEventJp:number = 1;

  constructor(
    private registeredService: RegisteredService,
    private eventservice: EventService,
    private translateService: TranslateService,
    private datepipe: DatePipe

  ) { }

  async ngOnInit() {
    this.registeredService.getRegisteredList().pipe(
      switchMap(()=> {
        return  this.registeredService.getRegisteredList()
      }), 
      tap((registeredList)=>{
        registeredList.forEach((element: any, index:number) => {
          //element.date_registered = this.datepipe.transform(element.date_registered, 'dd/MM/yyyy HH:mm')
          //console.log(element.date_registered)
          registeredList[index].languages = this.getLanguages(element.languages)
          console.log(registeredList[index].languages)
        })
        this.getNextEvent(this.nbEventFr, registeredList, 'PARIS')
        this.getNextEvent(this.nbEventJp, registeredList, 'TOKYO')
      })
    ).subscribe()
    console.log(this.events)
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
          registeredList: currentList
        });
      });
    })
  }

  getRegistered() {
    this.registeredService.getRegisteredList().subscribe((registeredList) => {
      this.registeredList = registeredList
    });
    console.log(this.registeredList)
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

  public getLocation(type:string){
    if(type === 'fr'){
      return "TOKYO"
    }
    return "PARIS"
  }

}
