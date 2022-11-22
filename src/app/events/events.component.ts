import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Event } from '../models/event';
import { EventService } from '../services/event.service';

const PAST_EVENT_QUANTITY = 10;
const NEXT_EVENT_QUANTITY = 2;

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  public pastEvents: any = [];
  public nextEvents: any = [];

  constructor(private eventService: EventService) {

  }

  ngOnInit(): void {
    this.getPastEvents();
    this.getNextEvents();
  }

  private getPastEvents(): void {
    this.eventService.getPastEvents({params: {limit: PAST_EVENT_QUANTITY}}).subscribe((pastEvents) => {
      this.pastEvents = pastEvents;
    });
  }

  private getNextEvents(): void {
    this.eventService.getNextEvents({params: {limit: NEXT_EVENT_QUANTITY}}).subscribe((nextEvents) => {
      this.nextEvents = nextEvents;
    });
  }
}
