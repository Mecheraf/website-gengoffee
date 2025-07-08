import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';


@Component({
  selector: 'app-event-row',
  templateUrl: './event-row.component.html',
  styleUrl: './event-row.component.css'
})
export class EventRowComponent {

  constructor(private translateService: TranslateService, private eventService: EventService) { }

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
        break;
      }
      case "location":{
        this.event.location = value
        break;
      }
      case "place":{
        this.event.place = value.target.value
        break;
      }
    }

  }

  toggleSubscribe(){
    this.event.subscribe = 1 - this.event.subscribe
  }



  deleteEvent(){
    if(confirm("Are you sure you want to delete this event?")){
      this.eventService.deleteEvent(this.event).subscribe((res:any) => {
        console.log(res)
      })
    }
    else{
      return
    }
    
  }

}
