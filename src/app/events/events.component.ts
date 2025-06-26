import { Component, OnInit, Injectable } from '@angular/core';
import { EventService } from '../services/event.service';
import { Meta } from '@angular/platform-browser';
import { SharedDataService } from '../shared/shared-data/shared-data.service';
import { BehaviorSubject } from 'rxjs';

const PAST_EVENT_QUANTITY = 10;
const NEXT_EVENT_QUANTITY = 2;

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class EventsComponent implements OnInit {
  public pastEvents: any = new BehaviorSubject<any>([]);
  public nextEvents: any = new BehaviorSubject<any>([]);

  constructor(
    private eventService: EventService, 
    private meta: Meta,
    public sharedEvents:SharedDataService

  ){

  }

  ngOnInit(): void {
    this.getPastEvents()
    this.getNextEvents()
    this.allTags()    
  }

  private getPastEvents(): void {
    this.sharedEvents.getPastEvents();
  }

  private getNextEvents(): void {
    this.sharedEvents.getNextEvents()
  }


  private allTags(){
    this.meta.updateTag({ name: 'title', content: 'Nos événements franco-japonais ou franco-anglais à Paris et à Tokyo.'});
    this.meta.updateTag({ name: 'description', content: 'Rejoignez-nous lors nos événements pour pratiquer le japonais ou l’anglais que vous souhaitez apprendre ou améliorer autour d\'un verre à Paris ou à Tokyo.'});
  }

  get returnSliced(){
    return this.sharedEvents.next["upcoming"]?.slice(0, 2)
  }

  scrollto(element: string) {
    console.log(element)
    const scrollToElement = document.getElementById(element);
    console.log(scrollToElement)
    scrollToElement?.scrollIntoView({ behavior: 'smooth' });
  }
}
