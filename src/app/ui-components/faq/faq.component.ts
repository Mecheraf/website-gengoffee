import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  openIndex: number | null = null;
  questions = [1, 2, 3, 4];

  toggle(index: number): void {
    this.openIndex = this.openIndex === index ? null : index;
  }
}
