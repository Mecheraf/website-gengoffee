import { Injectable } from '@angular/core';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Injectable({
  providedIn: 'root'
})
export class GtmService {

  constructor(private gtmService: GoogleTagManagerService) { }

  trackMe(event: string, eventCategory: string, eventLabel: string) {
    this.gtmService.pushTag({
      event: event,
      eventCategory: eventCategory,
      eventLabel: eventLabel
    })
  }
}
