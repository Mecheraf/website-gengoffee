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
    //this.formateDate(this.nextEvents[0].date)
    this.formate()
  }

  getNextEvents(limit:number) {
    this.eventservice.getNextEvents({params:{limit: limit}}).subscribe((data) => {
      this.nextEvents = data;
    })
  }

  getPastEvents(limit:number) {
    this.eventservice.getPastEvents({params:{limit: limit}}).subscribe((data) => {
      this.pastEvents = data;
      console.log(this.pastEvents[1].date)
    })
  }

  formateDate(theDate:Date){
    this.newDate = this.datePipe.transform(theDate, 'dd/MM/yyyy');
    console.log(this.newDate)
  }

  formate(){
    let tmp:String;
    
    console.log("hey")
  }
}
