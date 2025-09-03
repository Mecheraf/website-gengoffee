import { Component, OnInit } from '@angular/core';
import { GtmService } from '../../services/gtm.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private gtmService: GtmService) { }

  trackMeSocialLink(link:string) {
    this.gtmService.trackMe('footer-'+link, 'footer', 'footer'+link)
  }

}
