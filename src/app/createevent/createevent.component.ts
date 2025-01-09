import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventService } from '../services/event.service';
import { DatePipe } from '@angular/common'
import { SharedDataService } from '../shared/shared-data/shared-data.service';


const NEXT_EVENTS = 10

interface formParams {
  type:string,
  date:string|null,
  place:string,
  location:string
}

@Component({
  selector: 'app-createevent',
  templateUrl: './createevent.component.html',
  styleUrls: ['./createevent.component.css']
})


export class CreateeventComponent implements OnInit {
  @ViewChild('picker') picker: any;

  constructor(
    private eventservice: EventService, 
    private datepipe: DatePipe,
    public sharedEvents: SharedDataService
  ) { }

  public place:string ="";
  public type:string ="en";
  public location:string = "PARIS"

  public dateControl = new FormControl<Date>(new Date());
  public formGroup = {} as formParams;

  public dateDay = new Date();
  public dateTime:string = "18:00"

  public nextEvents:any[] = [];
  public selectedEvent:string = "0";


  ngOnInit(): void {
    this.getNextEvents(NEXT_EVENTS, 0, "PARIS");
    this.getNextEvents(NEXT_EVENTS, 1, "TOKYO");
  }

  getNextEvents(limit:number, position:number, location:string) {
    this.eventservice.getNextEvents({params:{limit: limit, location:location}}).subscribe((data) => {
      this.nextEvents[position] = data;
    })
  }

  submitForm(){
    const [ h, m ] = this.dateTime.split(":");
    this.dateDay.setHours(Number(h), Number(m))
    this.formGroup.type = this.type
    this.formGroup.date = this.datepipe.transform(this.dateDay, 'yyyy-MM-dd HH:mm:ss')
    this.formGroup.place = this.place
    this.formGroup.location = this.location
    this.eventservice.post(this.formGroup).subscribe();
  }

  refreshNextEvents(){
    this.getNextEvents(NEXT_EVENTS, 0, "PARIS");
    this.getNextEvents(NEXT_EVENTS, 1, "TOKYO");  
    console.log(this.sharedEvents.past)
  }

  changeLocation(location:string) {
    this.location = location
  }

  changeType(type:string) {
    this.type = type
  }
  
  selectEvent(id:string){
    this.selectedEvent = id
  }

  updateEvents(){
    var values: any[] = []
    this.nextEvents.forEach(groups => {
      groups.forEach((element: any) => {
        element.date = this.datepipe.transform(element.date, 'yyyy-MM-dd HH:mm:ss')
        values.push(element)
      })
    })
    this.eventservice.put(this.nextEvents).subscribe();
  }

}
