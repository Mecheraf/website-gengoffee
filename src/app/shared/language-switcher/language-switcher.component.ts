import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GtmService } from '../../services/gtm.service';


@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css']
})
export class LanguageSwitcherComponent implements OnInit {

  constructor(public translate: TranslateService, private gtmService: GtmService) {
    translate.addLangs(['en', 'fr', 'jp']);
    translate.setDefaultLang('fr');
  }

  switchLanguage(lang: string){
    this.translate.use(lang);
    this.gtmService.trackMe('language-switched', 'language-switched', lang)
  }

  ngOnInit(): void {
  }

}
