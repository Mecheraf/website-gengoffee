import { Component, OnInit, Input } from '@angular/core';
import { Job } from 'src/app/models/job';


@Component({
  selector: 'app-jobs-row',
  templateUrl: './jobs-row.component.html',
  styleUrls: ['./jobs-row.component.css']
})
export class JobsRowComponent implements OnInit {

  constructor() { }

  @Input() job: Job = {} as Job;


  ngOnInit(): void {
  }

}
