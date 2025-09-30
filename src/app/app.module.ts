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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginAdminComponent } from './loginAdmin/loginAdmin.component';
import { CookieService } from 'ngx-cookie-service';
import { RegisteredComponent } from './registered/registered.component';
import { JobboardComponent } from './jobboard/jobboard.component';
import { JobsRowComponent } from './ui-components/jobs-row/jobs-row.component';
import { JobsItemComponent } from './ui-components/jobs-item/jobs-item.component';
import { EventRowComponent } from './ui-components/event-row/event-row.component';

import { provideClientHydration } from '@angular/platform-browser';
import { CreatejobComponent } from './createjob/createjob.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { LegalNoticeComponent } from './legal/legal-notice/legal-notice.component';
import { SelectLanguageComponent } from './ui-components/select-language/select-language.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


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
    CreateeventComponent,
    ContactComponent,
    LoginAdminComponent,
    RegisteredComponent,
    JobboardComponent,
    JobsRowComponent,
    JobsItemComponent,
    CreatejobComponent,
    LegalNoticeComponent,
    SelectLanguageComponent,
    EventRowComponent
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
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatSnackBarModule,
    NgxMaterialTimepickerModule,
    MatSlideToggleModule
  ],
  providers: [
    MatDatepickerModule,
    DatePipe,
    MatSnackBarModule,
    CookieService,
    provideClientHydration(),
    provideAnimationsAsync(),
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}