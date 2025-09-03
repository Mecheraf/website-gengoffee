const NB_EVENTS = 2

import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { SharedDataService } from '../shared/shared-data/shared-data.service';
import { GtmService } from '../services/gtm.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})
export class HomeComponent implements OnInit {

  public nextEvents:any;
  public pastEvents:any;
  public newDate:string | null= "";
  constructor(
    public sharedEvents: SharedDataService, 
    private meta: Meta,
    private gtmService: GtmService
  ) { }

  ngOnInit(): void {
    this.getNextEvents()
    this.getPastEvents()
    this.allTags()
    this.trackMe()
  }

  private getNextEvents(): void {
    this.sharedEvents.getNextEvents();
  }

  private getPastEvents(): void {
    this.sharedEvents.getPastEvents();
  }

  allTags(){
    this.meta.updateTag({ name: 'title', content: 'Gengoffee association franco-japonaise pour des échanges de langue à Paris et à Tokyo.'});
    this.meta.updateTag({ name: 'description', content: 'Gengoffee propose des échanges linguistiques pour parler à des étrangers japonais ou anglais lors de ses évènements organisés à Paris et à Tokyo. Faites vous des amis étrangers.'});
  }

  trackMe() {
    this.gtmService.trackMe('page-home', 'home', 'home-page')
  }

  trackMeButton(button:string) {
    this.gtmService.trackMe('home-'+button, 'home', 'home-'+button)
  }

}
