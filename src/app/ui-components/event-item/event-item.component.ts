import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Event } from 'src/app/models/event';

const LANGUAGE_FLAGS: Record<string, string> = {
  fr: '🇫🇷',
  jp: '🇯🇵',
  en: '🇬🇧',
  kr: '🇰🇷',
  es: '🇪🇸',
};

const ACTIVITY_TYPES = new Set(['karaoke-jp', 'karaoke-int', 'boardgame', 'anniversary']);

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit {

  @Input() event: Event = {} as Event;
  @Input() active: boolean = false;
  @Input() participateLink: boolean = true;
  @Input() fallback: boolean = false;
  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
  }

  public getEventKindKey(): string {
    const type = this.event.type?.toLocaleLowerCase();
    return type && ACTIVITY_TYPES.has(type) ? 'eventKind.activity' : 'eventKind.exchange';
  }

  public getEventTitle(): string {
    const type = this.event.type?.toLocaleLowerCase();
    if (!type) {
      return '';
    }
    const typeLabel = this.translateService.instant(type);
    if (ACTIVITY_TYPES.has(type)) {
      return typeLabel;
    }
    return `${this.translateService.instant(this.hostLanguage())}-${typeLabel}`;
  }

  public getEventFlags(): string {
    const type = this.event.type?.toLocaleLowerCase();
    if (!type || type === 'anniversary') {
      return '';
    }
    if (type === 'karaoke-jp') {
      return `${LANGUAGE_FLAGS[this.hostLanguage()]} ${LANGUAGE_FLAGS['jp']}`;
    }
    if (type === 'karaoke-int') {
      return `${LANGUAGE_FLAGS[this.hostLanguage()]} 🌍`;
    }
    if (type === 'boardgame') {
      return `${LANGUAGE_FLAGS['jp']} ${LANGUAGE_FLAGS['en']}`;
    }
    const hostFlag = LANGUAGE_FLAGS[this.hostLanguage()];
    const typeFlag = LANGUAGE_FLAGS[type];
    if (!typeFlag || hostFlag === typeFlag) {
      return hostFlag ?? '';
    }
    return `${hostFlag} ${typeFlag}`;
  }

  private hostLanguage(): string {
    return this.event.location?.toLocaleLowerCase() === 'tokyo' ? 'jp' : 'fr';
  }

  public getImageByCountry(id:string): string {
    if (this.event.type === 'jp') {
      return 'gengoffee_event-'+(Number(id)%2+1)+'.webp';
    } else if (this.event.type?.toLocaleLowerCase().startsWith('karaoke')) {
      return 'gengoffee_event_karaoke2.webp';
    } else if (this.event.type?.toLocaleLowerCase() === 'boardgame') {
      return 'photo-bd.webp';
    } else if (this.event.type?.toLocaleLowerCase() === 'kr') {
      return 'photo-kr.webp';
    } else if (this.event.type?.toLocaleLowerCase() === 'anniversary') {
      return 'GengoffeeAnniversary.JPG';
    }
    return 'photo-en-'+ Number(id)%4 +'.webp';
  }

  public getColorByCountry(): string {
    const type = this.event.type?.toLocaleLowerCase();
    if (type === 'karaoke-jp' || type === 'karaoke-int' || type === 'boardgame') {
      return 'gengoffee-lightgreen-bg';
    }
    if (type === 'jp') {
      return 'gengoffee-lightred-bg';
    }
    if (type === 'en') {
      return 'gengoffee-lightblue-bg';
    }
    if (type === 'kr') {
      return 'gengoffee-green-bg';
    }
    if (type === 'anniversary') {
      return 'gengoffee-lightyellow-bg';
    }
    return 'gengoffee-lightblue-bg';
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