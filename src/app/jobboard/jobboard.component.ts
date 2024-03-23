import { Component, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service';

@Component({
  selector: 'app-jobboard',
  templateUrl: './jobboard.component.html',
  styleUrls: ['./jobboard.component.css']
})
export class JobboardComponent implements OnInit {

  constructor(private jobService: JobsService) { }

  public jobsList:any;
  public selectedJob:number = 0;


  ngOnInit(): void {
    this.getJobs()
    this.selectedJob = this.jobsList[0].id
  }


  getJobs() {
    this.jobService.getJobs().subscribe((data) => {
      this.jobsList = data;
      this.jobsList.forEach((element:any) => {
        element.missions = element.missions.split(";")
        element.requirements = element.requirements.split(";")
      });
    })
  }

  selectJob(id:string) {
    this.jobsList.forEach((element:any, index:number) => {
      if(element.id === id){
        this.selectedJob = index;
      }
    })
  }

}
