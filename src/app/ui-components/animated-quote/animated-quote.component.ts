import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-animated-quote',
  templateUrl: './animated-quote.component.html',
  styleUrls: ['./animated-quote.component.css']
})
export class AnimatedQuoteComponent {

  @Input() content: string = "";
  @Input() revert: boolean = false;
  @Input() empty: boolean = false;
  @Input() width: number = 126;
  @Input() height: number = 43;
  constructor() { }

}
