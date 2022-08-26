import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-waves',
  templateUrl: './waves.component.html',
  styleUrls: ['./waves.component.css']
})
export class WavesComponent implements OnInit {

  @Input() color: string = "";
  @Input() top: string = "";
  @Input() bottom: string = "";
  @Input() right: string = "";
  @Input() left: string = "";
  @Input() translateY: string = "0%";
  public style: string = "";

  constructor() { }

  ngOnInit(): void {
    this.setWavesStyle();
  }

  private setWavesStyle(): void {
    this.style = `top: ${this.top}; bottom: ${this.bottom}; right: ${this.right}; left: ${this.left}; transform: translateY(${this.translateY})`;
  }
}
