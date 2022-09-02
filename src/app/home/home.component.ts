import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public nextEvents:any;
  public pastEvents:any;
  constructor(private eventservice: EventService) { }

  ngOnInit(): void {
  }

  getNextEvents(limit:number) {
    this.eventservice.getNextEvents({params:{limit: limit}}).subscribe((data) => {
      this.nextEvents = data;
    })
  }
/*
  getPastEvents(limit:number) {
    this.eventservice.getPastEvents({params:{limit: limit}}).subscribe((data) => {
      this.nextEvents = data;
    })
  }*/

}
