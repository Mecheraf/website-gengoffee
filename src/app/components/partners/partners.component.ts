import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent {

  @Input() emptyQuote: boolean = false;
  constructor() { }

}
