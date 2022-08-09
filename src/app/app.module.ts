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
    WavesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
