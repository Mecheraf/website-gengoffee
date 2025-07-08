import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { Router, NavigationEnd } from '@angular/router';
import {Location,LocationStrategy,PathLocationStrategy } from '@angular/common';
import { Observable } from 'rxjs';

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
    private location:Location
  ) { }

  ngOnInit(): void {
    this.getWindowSize();
    this.cdRef.detectChanges();
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
