import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Meta } from '@angular/platform-browser';
import { GtmService } from '../services/gtm.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  public countEvents:any;
  constructor(private eventservice: EventService, private meta: Meta, private gtmService: GtmService) { }

  ngOnInit(): void {
    this.getCountEvent()
    this.allTags() 
    this.trackMe()
  }

  getCountEvent() {
    this.eventservice.getCountEvents().subscribe((data) => {
      this.countEvents = data;
    })
  }

  private allTags(){
    this.meta.updateTag({ name: 'title', content: 'Association France/Japon. Participez à nos échanges de langue à Paris ou à Tokyo.'});
    this.meta.updateTag({ name: 'description', content: 'Gengoffee est une association franco-japonaise qui permet à ses participants de rencontrer des Japonais ou anglophones lors de ses échanges de langue à Paris ou à Tokyo.'});
  }

  trackMe() {
    this.gtmService.trackMe('page-about-us', 'about-us', 'about-us-page')
  }
}
