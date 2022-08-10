import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LanguageSwitcherComponent } from './shared/language-switcher/language-switcher.component';
import { HomeComponent } from './home/home.component';
import { EventItemComponent } from './ui-components/event-item/event-item.component';
import { PartnersComponent } from './components/partners/partners.component';
import { GengoffeeNoticeComponent } from './components/gengoffee-notice/gengoffee-notice.component';
import { ClientsFeedbackComponent } from './components/clients-feedback/clients-feedback.component';
import { WavesComponent } from './ui-components/waves/waves.component';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { EventsComponent } from './events/events.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LanguageSwitcherComponent,
    HomeComponent,
    EventItemComponent,
    PartnersComponent,
    GengoffeeNoticeComponent,
    ClientsFeedbackComponent,
    WavesComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'events', component: EventsComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}