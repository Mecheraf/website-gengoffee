import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public showMobileMenu: boolean = false;

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }

  openMenu() {
    this.showMobileMenu = true;
  }

  closeMenu() {
    this.showMobileMenu = false;
  }

  switchLanguage(lang: string){
    this.translate.use(lang);
  }

  @HostListener('window:resize', ['$event'])
  isMobile() {
    return window.innerWidth < 768;
  }
}
