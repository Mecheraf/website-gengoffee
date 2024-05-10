const NB_EVENTS = 2

import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { DatePipe } from '@angular/common';
import { Meta } from '@angular/platform-browser';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})
export class HomeComponent implements OnInit {

  public nextEvents:any;
  public pastEvents:any;
  public newDate:string | null= "";
  constructor(private eventservice: EventService, private datePipe: DatePipe, private meta: Meta) { }

  ngOnInit(): void {
    this.getNextEvents(NB_EVENTS)
    this.getPastEvents(NB_EVENTS)
    this.allTags()
  }

  getNextEvents(limit:number) {
    this.eventservice.getNextEvents({params:{limit: limit}}).subscribe((data) => {
      this.nextEvents = data;
    })
  }

  getPastEvents(limit:number) {
    this.eventservice.getPastEvents({params:{limit: limit}}).subscribe((data) => {
      this.pastEvents = data;
    })
  }

  allTags(){
    this.meta.addTag({ name: 'title', content: 'Gengoffee association franco-japonaise pour des échanges de langue à Paris et à Tokyo.'});
    this.meta.addTag({ name: 'description', content: 'Gengoffee propose des échanges linguistiques pour parler à des étrangers japonais ou anglais lors de ses évènements organisés à Paris et à Tokyo. Faites vous des amis étrangers.'});
  }


}
