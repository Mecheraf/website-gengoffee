import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { Router } from '@angular/router';
import {Location,LocationStrategy,PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ]
})
export class HeaderComponent implements OnInit {

  public showMobileMenu: boolean = false;
  public isMobile: boolean = false;
  public onAdmin:boolean = false;

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

  onAdminPage():boolean{
    console.log(this.router.url)
    if(this.router.url === "/admin/events" || this.router.url === "/admin/registered"){
      console.log("Hello")
      return true
    } 
    return false
  }

  isAdvancedRoute(): boolean {
    return this.location.path().indexOf('/admin/events') > -1;
  }
}
