import { Injectable } from '@angular/core';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class GtmService {

  constructor() { }

  trackMe(event: string, eventCategory: string, eventLabel: string) {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: event,
        eventCategory: eventCategory,
        eventLabel: eventLabel
      });
    }
  }

  pushTag(data: any) {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(data);
    }
  }
}
