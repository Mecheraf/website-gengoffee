const NB_EVENTS = 2

import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})
export class HomeComponent implements OnInit {

  public nextEvents:any;
  public pastEvents:any;
  public newDate:string | null= "";
  constructor(private eventservice: EventService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getNextEvents(NB_EVENTS)
    this.getPastEvents(NB_EVENTS)
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

}
