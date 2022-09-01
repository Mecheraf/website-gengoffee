import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-past-event-card',
  templateUrl: './past-event-card.component.html',
  styleUrls: ['./past-event-card.component.css']
})
export class PastEventCardComponent implements OnInit {

  

  public language:string ="";
  @Input() event: Event = {} as Event; 

  constructor(public translate: TranslateService) { 

    
  }
  
  
  

  ngOnInit(): void {
    this.switchLanguage()
  }

  public switchLanguage(){
      
    /*if(this.event.type == "en"){
      this.language = this.translate.get('foo.bar').subscribe((res: string) => {
        return res;;
      } 
    } else {
      this.language = "japanese"
    }TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
  }
  
}
