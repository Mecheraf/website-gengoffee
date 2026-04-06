import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import {Location,LocationStrategy,PathLocationStrategy } from '@angular/common';
import { GtmService } from '../../services/gtm.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ]
})
export class HeaderComponent implements OnInit {

  public showMobileMenu: boolean = false;
  public isMobile: boolean = false;
  public onAdmin:boolean = false;
  public isAdmin:boolean = false;

  constructor(
    public translate: TranslateService, 
    private cdRef:ChangeDetectorRef,
    private router:Router,
    private location:Location,
    private gtmService: GtmService
  ) { }

  ngOnInit(): void {
    this.getWindowSize();
    this.cdRef.detectChanges();
  }

  openMenu() {
    this.showMobileMenu = true;
    this.gtmService.trackMe('menu-opened', 'menu', 'menu-opened')
  }

  closeMenu(page:string) {
    this.gtmService.trackMe('menu-'+page, 'menu', 'menu-'+page)
    this.showMobileMenu = false;
  }

  switchLanguage(lang: string){
    this.translate.use(lang);
    this.gtmService.trackMe('language-switched', 'language-switched', lang)
  }

  @HostListener('window:resize', ['$event'])
  getWindowSize() {
    this.isMobile = window.innerWidth < 768;
  }

  onAdminPage(url:string):boolean{
    if(url === "/admin/events" || url === "/admin/registered"){
      return true
    }
    return false
  }

  isAdvancedRoute(): boolean {
    return this.onAdminPage(this.location.path())
  }
}
