import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public showMobileMenu: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openMenu() {
    this.showMobileMenu = true;
  }

  closeMenu() {
    this.showMobileMenu = false;
  }

  @HostListener('window:resize', ['$event'])
  isMobile() {
    return window.innerWidth < 768;
  }
}
