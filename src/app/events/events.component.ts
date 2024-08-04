import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Event } from '../models/event';
import { EventService } from '../services/event.service';
import { Meta } from '@angular/platform-browser';


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

  constructor(private eventService: EventService, private meta: Meta){

  }

  ngOnInit(): void {
    this.getPastEvents();
    //this.getNextEvents();
    this.allTags()
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


  private allTags(){
    this.meta.updateTag({ name: 'title', content: 'Nos événements franco-japonais ou franco-anglais à Paris et à Tokyo.'});
    this.meta.updateTag({ name: 'description', content: 'Rejoignez-nous lors nos événements pour pratiquer le japonais ou l’anglais que vous souhaitez apprendre ou améliorer autour d\'un verre à Paris ou à Tokyo.'});
    console.log("update")
  }
}
