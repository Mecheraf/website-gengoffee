import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GtmService } from '../../services/gtm.service';


interface userLanguage {
  language: string,
  level: string,
}

interface LanguagesToDisplay {
  translationKey: string,
  value: string,
}

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrl: './select-language.component.css'
})

export class SelectLanguageComponent implements OnInit {

  @Input() selectedLanguages: userLanguage[] = [] as userLanguage[];
  
  constructor(private gtmService: GtmService) { }

  public allLanguages: LanguagesToDisplay[] = [
    {translationKey: 'fr', value: 'fr'},
    {translationKey: 'en', value: 'en'},
    {translationKey: 'jp', value: 'jp'},
  ];

  public availableLanguages: LanguagesToDisplay[] = [];

  public languages: string[] = ["fr", "jp", "en"];

  ngOnInit(): void {
    this.availableLanguages = this.allLanguages
  }

  addLanguage(){
    if (this.selectedLanguages.length >= 3) return;
    const language: userLanguage = {
      language: this.availableLanguages[0].value,
      level: '1'
    }
    this.selectedLanguages.push(language);
    this.filterAvailableLanguages();
    this.trackMeLanguage('add-language', language.language, language.level)
  }

  removeLanguage(language: userLanguage){
    this.selectedLanguages = this.selectedLanguages.filter((lang) => lang !== language);
    this.filterAvailableLanguages();
    this.trackMeLanguage('remove-language', language.language, language.level)
  }

  filterAvailableLanguages() {
    this.availableLanguages = this.allLanguages.filter((lang) => !this.selectedLanguages.map((selectedLang) => selectedLang.language).includes(lang.value));
  }

  getLanguageTranslation(language: string): string {
    return this.allLanguages.find((lang) => lang.value === language)?.translationKey ?? '';
  }

  trackMeLanguage(type:string, language: string, level: string) {
    this.gtmService.trackMe(type, 'register', type+'-'+language+'-'+level)
  }

}
