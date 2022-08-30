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
import { PastEventCardComponent } from './ui-components/past-event-card/past-event-card.component';
import { AnimatedQuoteComponent } from './ui-components/animated-quote/animated-quote.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateeventComponent } from './createevent/createevent.component';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';


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
    EventsComponent,
    PastEventCardComponent,
    AnimatedQuoteComponent,
    AboutUsComponent,
    RegisterComponent,
    CreateeventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient] 
        }
    }),
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    NgxMatNativeDateModule

  ],
  providers: [
    MatDatepickerModule,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}