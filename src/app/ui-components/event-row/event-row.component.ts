import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Event } from 'src/app/models/event';


@Component({
  selector: 'app-event-row',
  templateUrl: './event-row.component.html',
  styleUrl: './event-row.component.css'
})
export class EventRowComponent {

  constructor(private translateService: TranslateService) { }

  @Input() event: Event = {} as Event;


  ngOnInit(): void {
  }

  public getTranslatedDate() {
    const eventDate = new Date(this.event.date);
    const translatedDay = this.translateService.instant('days.' + eventDate.getUTCDay().toString());
    const translatedMonth = this.translateService.instant('months.' + eventDate.getUTCMonth().toString());
    const dayNumber = eventDate.getUTCDate();
    const year = eventDate.getFullYear();

    return this.translateService.instant('fullDate', {day: translatedDay, month: translatedMonth, dayNumber: dayNumber, year: year });
  }

  public getDayHour() {
    const eventDate = new Date(this.event.date);
    return eventDate.getUTCHours().toString().padStart(2, '0') + ':' + eventDate.getMinutes().toString().padStart(2, '0');
  }

  updateEvent(type:string, value:any){
    switch (type){
      case "type":{
        this.event.type = value
        console.log(this.event.type)
        break;
      }
      case "location":{
        this.event.location = value
        console.log(this.event.location)

        break;
      }
      case "place":{
        this.event.place = value.target.value
        break;
      }
    }


  }

}
