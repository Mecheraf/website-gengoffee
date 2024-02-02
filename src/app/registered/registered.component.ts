import { Component, OnInit } from '@angular/core';
import { __values } from 'tslib';
import { RegisteredService } from '../services/registered.service';
import { EventService } from '../services/event.service';
import { switchMap, tap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';



interface registeredUser {
  name:string,
  languages:string[],
  mail:string,
  diet:string[], 
  id_event:number,
  date_registered:Date
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
          element.date_registered = this.datepipe.transform(element.date_registered, 'dd/MM/yyyy HH:mm')
          console.log(element.date_registered)
        })
        this.getNextEvent(3, registeredList)
      })
    ).subscribe() 
  }

  getNextEvent(limit:number, registeredList:any) {
    this.eventservice.getNextEvents({params:{limit: limit}}).subscribe((data) => {
      this.nextEvents = data;
      this.nextEvents.forEach((element: any, index:number) => {
        const currentList:any = registeredList.filter((registered: { id_event: any; }) => 
          registered.id_event == element.id
        )
        this.events[index] = {
          id: element.id,
          date: element.date,
          type: element.type,
          registeredList: currentList
        } ;      
      });
    })
  }

  getRegistered() {
    this.registeredService.getRegisteredList().subscribe((registeredList) => {
      this.registeredList = registeredList
    });
  }
  
  public getColorByCountry(eventType:string): string {
    if (eventType === 'jp') {
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

}
