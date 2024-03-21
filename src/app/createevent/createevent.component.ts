import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { EventService } from '../services/event.service';
import { DatePipe } from '@angular/common'


interface formParams {
  type:string,
  date:string|null,
  place:string,
  location:string
}

@Component({
  selector: 'app-createevent',
  templateUrl: './createevent.component.html',
  styleUrls: ['./createevent.component.css']
})


export class CreateeventComponent implements OnInit {
  @ViewChild('picker') picker: any;

  constructor(private eventservice: EventService, private datepipe: DatePipe) { }
  public type:string ="";
  public place:string ="";

  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: Date = new Date("2022-09-04");
  public maxDate?: Date = new Date("2025-06-30");
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  public disableMinute = false;
  public hideTime = false;
  public location = "PARIS"

  public dateControl = new FormControl<Date>(new Date());

  public options = [
    { value: true, label: 'True' },
    { value: false, label: 'False' }
  ];

  public listColors = ['primary', 'accent', 'warn'];

  public stepHours = [1, 2, 3, 4, 5];
  public stepMinutes = [1, 5, 10, 15, 20, 25];
  public stepSeconds = [1, 5, 10, 15, 20, 25];


  public formGroup = {} as formParams;

  ngOnInit(): void {
  }

  submitForm(){
    this.formGroup.type = this.type
    this.formGroup.date = this.datepipe.transform(this.dateControl.value, 'yyyy-MM-dd HH:mm:ss')
    this.formGroup.place = this.place
    this.formGroup.location = this.location
    this.eventservice.post(this.formGroup).subscribe();
  }

  toggleMinDate(evt: any) {
    if (evt.checked) {
      this._setMinDate();
    } else {
      this.minDate = new Date(0);
    }
  }

  toggleMaxDate(evt: any) {
    if (evt.checked) {
      this._setMaxDate();
    } else {
      this.maxDate = new Date(0);
    }
  }

  closePicker() {
    this.picker.cancel();
  }

  private _setMinDate() {
    const now = new Date();
    this.minDate = new Date();
    this.minDate.setDate(now.getDate() - 1);
  }


  private _setMaxDate() {
    const now = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(now.getDate() + 1);
  }

  changeLocation(location:string) {
    this.location = location
  }

}
