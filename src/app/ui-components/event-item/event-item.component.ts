import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Event } from 'src/app/models/event';


const localeToFlag: any = {
  'fr' : '🇫🇷',
  'karaoke':'🇯🇵🎤',
  'jp' : '🇯🇵',
  'en' : '🇬🇧',
  'es' : '🇪🇸',
  'kr' : '🇰🇷',
  'boardgame' : '🇯🇵🇬🇧'
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
      if(String(this.event.location)?.toLocaleLowerCase() === "tokyo"){
        this.defaultLanguage = "🇯🇵"
      }
      return this.defaultLanguage + ' ' + localeToFlag[this.event.type] 
    }

    return this.defaultLanguage;
  }

  public getImageByCountry(id:string): string {
    if (this.event.type === 'jp') {
      return 'gengoffee_event-'+(Number(id)%2+1)+'.webp';
    } else if (this.event.type?.toLocaleLowerCase() === 'karaoke') {
      return 'gengoffee_event_karaoke2.webp';
    } else if (this.event.type?.toLocaleLowerCase() === 'boardgame') {
      return 'photo-bd.webp';
    } else if (this.event.type?.toLocaleLowerCase() === 'kr') {
      return 'photo-kr.webp';
    }
    return 'photo-en-'+ Number(id)%4 +'.webp';
  }

  public getColorByCountry(): string {
    if (this.event.type === 'jp' || this.event.type?.toLocaleLowerCase() === 'karaoke') {
      return "gengoffee-lightred-bg";
    } else if (this.event.type?.toLocaleLowerCase() === 'kr') {
      return "gengoffee-green-bg";
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
    const translatedDay = this.translateService.instant('days.' + eventDate.getUTCDay().toString());
    const translatedMonth = this.translateService.instant('months.' + eventDate.getUTCMonth().toString());
    const dayNumber = eventDate.getUTCDate();
    const year = eventDate.getFullYear();

    return this.translateService.instant('fullDate', {day: translatedDay, month: translatedMonth, dayNumber: dayNumber, year: year });
  }

  public getDayHour(location:string) {
    const eventDate = new Date(this.event.date);
    return eventDate.getUTCHours().toString().padStart(2, '0') + ':' + eventDate.getMinutes().toString().padStart(2, '0');
  }

}