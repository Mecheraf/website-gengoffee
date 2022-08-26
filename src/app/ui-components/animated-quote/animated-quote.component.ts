import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-animated-quote',
  templateUrl: './animated-quote.component.html',
  styleUrls: ['./animated-quote.component.css']
})
export class AnimatedQuoteComponent implements OnInit {

  @Input() content: string = "";
  @Input() revert: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
