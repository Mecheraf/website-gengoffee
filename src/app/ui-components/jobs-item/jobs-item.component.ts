import { Component, OnInit, Input } from '@angular/core';
import { Job } from 'src/app/models/job';


@Component({
  selector: 'app-jobs-item',
  templateUrl: './jobs-item.component.html',
  styleUrls: ['./jobs-item.component.css']
})
export class JobsItemComponent implements OnInit {

  constructor() { }

  @Input() job: Job = {} as Job;

  ngOnInit(): void {
  }

}
