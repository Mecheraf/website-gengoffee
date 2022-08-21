import { Component, Input, OnInit } from '@angular/core';

const localeToFlag: any = {
  'jp' : '🇯🇵',
  'en' : '🇬🇧',
  'es' : '🇪🇸'
}

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit {

  private defaultLanguage: string = '🇫🇷';
  public flags: string = '';
  public hour: string = '';

  @Input() language: string = "jp"; // Use locale e.g. fr, en, jp
  @Input() active: boolean = false;
  @Input() participateLink: boolean = true;
  @Input() date: string = "";
  @Input() place: string = "";
  constructor() { }

  ngOnInit(): void {
    this.createFlags();
  }

  private createFlags(): void {
    this.flags = this.defaultLanguage + localeToFlag[this.language];
  }

}
