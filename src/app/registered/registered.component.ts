import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.css']
})
export class RegisteredComponent implements OnInit {

  public registered: any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
