import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Event } from 'src/app/models/event';


const localeToFlag: any = {
  'jp' : '🇯🇵',
  'en' : '🇬🇧',
  'es' : '🇪🇸'
}

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit {
  

  private defaultLanguage: string = '🇫🇷';
  public flags: string = '';
  public hour: string = '';

  @Input() event: Event = {} as Event;
  @Input() active: boolean = false;
  @Input() participateLink: boolean = true;
  @Input() fallback: boolean = false;
  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
  }

  public renderFlags(): string {
    if (localeToFlag[this.event.type]) {
      return this.defaultLanguage + ' ' + localeToFlag[this.event.type] 
    }

    return this.defaultLanguage;
  }

  public getImageByCountry(): string {
    if (this.event.type === 'jp') {
      return 'gengoffee_event-1.png';
    }
    return 'gengoffee_event-2.png';
  }

  public getColorByCountry(): string {
    if (this.event.type === 'jp') {
      return "gengoffee-lightred-bg";
    }
    
    return "gengoffee-lightblue-bg";
  }

  public isPastEvent(): string {
    return new Date(this.event.date) < new Date()
      ? this.translateService.instant('events.past')
      : this.translateService.instant('events.incoming');
  }

  public getTranslatedDate() {
    const eventDate = new Date(this.event.date);
    const translatedDay = this.translateService.instant('days.' + eventDate.getDay().toString());
    const translatedMonth = this.translateService.instant('months.' + eventDate.getMonth().toString());
    const dayNumber = eventDate.getDate();
    const year = eventDate.getFullYear();

    return this.translateService.instant('fullDate', {day: translatedDay, month: translatedMonth, dayNumber: dayNumber, year: year });
  }

  public getDayHour() {
    const eventDate = new Date(this.event.date);
    return eventDate.getUTCHours().toString().padStart(2, '0') + ':' + eventDate.getMinutes().toString().padStart(2, '0');
  }

}