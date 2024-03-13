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

  constructor(public translateService: TranslateService) {}

  ngOnInit(): void {
    console.log(this.event)
  }

  public getLanguageByLocale(){
    if (!this.event.type) return '';
    return this.translateService.instant(this.event.type);
  }

  public getMainLanguage(){
    if(this.event.location.toLocaleLowerCase() === "tokyo"){
      return this.translateService.instant("jp");
    }
    return this.translateService.instant("fr");
  }

  public getColorByCountry(): string {
    if (this.event.type === 'jp' || this.event.type === 'fr' || this.event.type.toLocaleLowerCase() === 'karaoke') {
      return "gengoffee-lightred-bg";
    }
    
    return "gengoffee-lightblue-bg";
  }

  public getTranslatedDate() {
    const eventDate = new Date(this.event.date);
    const translatedDay = this.translateService.instant('days.' + eventDate.getDay().toString());
    const translatedMonth = this.translateService.instant('months.' + eventDate.getMonth().toString());
    const dayNumber = eventDate.getDate();

    return this.translateService.instant('dateWithoutYear', {day: translatedDay, month: translatedMonth, dayNumber: dayNumber });
  }
  
}
