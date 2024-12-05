import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventService } from 'src/app/services/event.service';


const PAST_EVENT_QUANTITY = 10;
const NEXT_EVENT_QUANTITY = 6;

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor(
    private eventService: EventService  
  ) { }

  public past: any = new BehaviorSubject<any>([]);
  public next: any = new BehaviorSubject<any>([]);
  public tokyo : any = new BehaviorSubject<any>([]);

  // public getPastEvents(): any {
  //   if(sessionStorage.getItem('pastEvents')){
  //     console.log("We have past Events")
  //   } else {
  //     console.log("No past events")
  //     this.eventService.getPastEvents({params: {limit: PAST_EVENT_QUANTITY}}).subscribe((pastEvents) => {
  //       sessionStorage.setItem('pastEvents', JSON.stringify(pastEvents))
  //     });
  //   }
  //   return JSON.parse(sessionStorage.getItem('pastEvents')!);
  // }

  // public getNextEvents(): any {
  //   if(sessionStorage.getItem('nextEvents')){
  //     console.log("We have next Events")
  //   } else {
  //     console.log("No next events")
  //     this.eventService.getNextEvents({params: {limit: NEXT_EVENT_QUANTITY}}).subscribe((nextEvents) => {
  //       sessionStorage.setItem('nextEvents', JSON.stringify(nextEvents))
  //     });
  //   }
  //   this.next = JSON.parse(sessionStorage.getItem('nextEvents')!);
  //   return this.next
  // }

  // public getNextEventsTokyo(): void {
  //   if(sessionStorage.getItem('tokyoEvents')){
  //     console.log("We have next Events")
  //   } else {
  //     console.log("No next events")
  //     this.eventService.getNextEvents({params:{limit: NEXT_EVENT_QUANTITY, location:location}}).subscribe((nextEvents) => {
  //       sessionStorage.setItem('tokyoEvents', JSON.stringify(nextEvents))
  //     });
  //   }
  //   this.tokyo = JSON.parse(sessionStorage.getItem('tokyoEvents')!);
  // }

  public getPastEvents(): any {
    if(this.past.value.length === 0){
      this.eventService.getPastEvents({params:{limit: PAST_EVENT_QUANTITY}}).subscribe((pastEvents) => {
        this.past = pastEvents
      }); 
    }
  }

  public getNextEvents(location?:string): any {
    if(this.next.value.length === 0){
      this.eventService.getNextEvents({params:{limit: NEXT_EVENT_QUANTITY}}).subscribe((nextEvents) => {
        this.next["next"] = nextEvents
      }); 
    }
  }

  public getCityEvents(location:string): any {
    this.eventService.getNextEvents({params:{limit: NEXT_EVENT_QUANTITY, location:location}}).subscribe((nextEvents) => {
      console.log(nextEvents)
      this.next[location] = nextEvents
    }); 
  }
}
