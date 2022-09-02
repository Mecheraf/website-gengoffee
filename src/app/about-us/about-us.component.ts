import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  public countEvents:any;
  constructor(private eventservice: EventService,) { }

  ngOnInit(): void {
    this.getCountEvent()
  }

  getCountEvent() {
    this.eventservice.getCountEvents().subscribe((data) => {
      this.countEvents = data;
    })
  }
}
