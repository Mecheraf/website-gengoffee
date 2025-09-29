import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare global {
  interface Window {
    dataLayer: any[];
    Cookiebot: any;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, public translate: TranslateService) {

    translate.addLangs(['en', 'fr', 'jp']);
    translate.setDefaultLang('fr');

    if (typeof window !== 'undefined') {
      // Initialize dataLayer
      window.dataLayer = window.dataLayer || [];
      
      // Initialize GTM when consent is given
      this.initializeGTMWithConsent();
      
      // Track page views on route changes
      this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          this.trackPageView(event.urlAfterRedirects || event.url);
        });
    }
  }

  private initializeGTMWithConsent(): void {
    // Check if Cookiebot is loaded and consent is given
    const checkConsentAndInit = () => {
      if (window.Cookiebot && window.Cookiebot.consent && window.Cookiebot.consent.statistics) {
        // Initialize GTM dataLayer with consent
        window.dataLayer.push({
          'gtm.start': new Date().getTime(),
          'event': 'gtm.js'
        });
        
        // Track initial page view
        this.trackPageView(window.location.pathname);
      }
    };

    // Check immediately if Cookiebot is already loaded
    if (window.Cookiebot) {
      checkConsentAndInit();
    }

    // Listen for consent changes
    window.addEventListener('CookiebotOnConsentReady', checkConsentAndInit);
    window.addEventListener('CookiebotOnAccept', checkConsentAndInit);
  }

  private trackPageView(pagePath: string): void {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        'event': 'page_view',
        'page_path': pagePath,
        'page_location': window.location.href,
        'page_title': document.title
      });
    }
  }

  switchLanguage(lang: string){
    this.translate.use(lang);
  }

  onActivate() {
    window.scrollTo(0, 0);
  }

}
