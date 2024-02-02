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

  public skills:string[] = [
    "Anglais - Japonais (niveau B2 minimum)",
    "Capacité à travailler avec grâce et courtoisie, même sous pression.",
    "Bonnes compétences en gestion du temps et en organisation.",
    "Souci du détail et sens aigu de l'hospitalité.",
    "Capacité à travailler en équipe et à collaborer avec d'autres membres du personnel."
  ]
  public missions:string[] = ["Accueil et Orientation",
  "Service à la Clientèle",
  "Communication",
  "Gestion des Réservations"]

  ngOnInit(): void {
    this.getJobs()
  }


  getJobs() {
    this.jobService.getJobs().subscribe((data) => {
      this.jobsList = data;
    })
  }

}
