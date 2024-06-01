import { Component, OnInit, ViewChild  } from '@angular/core';
import { JobsService } from '../services/jobs.service';

interface formParams {
  title:string,
  description:string|null,
  contract:string,
  location:string;
  salary:string,
  missions:string,
  requirements:string,
  more:string
}

@Component({
  selector: 'app-createjob',
  templateUrl: './createjob.component.html',
  styleUrls: ['./createjob.component.css']
})


export class CreatejobComponent implements OnInit {

  constructor(private jobService: JobsService) { }

  public formGroup = {} as formParams;

  public title:string="";
  public description:string="";
  public contract:string="";
  public location:string="";
  public salary:string="";
  public missions:string="";
  public requirements:string="";
  public more:string="";

  ngOnInit(): void {
  }

  submitForm(){
    this.formGroup.title = this.title
    this.formGroup.description = this.description
    this.formGroup.location = this.location
    this.jobService.insertJob(this.formGroup).subscribe();
  }



}
