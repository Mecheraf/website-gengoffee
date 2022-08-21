import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gengoffee-notice',
  templateUrl: './gengoffee-notice.component.html',
  styleUrls: ['./gengoffee-notice.component.css']
})
export class GengoffeeNoticeComponent implements OnInit {

  @Input() redWave: boolean = false;
  @Input() blueWave: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
