import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ContactService } from '../contact.service';
import { Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public formGroup: FormGroup = this.builder.group({
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    comment: new FormControl('', [Validators.required]),
    subject: new FormControl('', [Validators.required]),
    phone: new FormControl('', [])
  });
  public loading: boolean = false;
  public success: boolean = true;
  
  constructor(private builder: FormBuilder, private contactService: ContactService, private meta: Meta) { }

  ngOnInit(): void {
    this.allTags()
  }

  onSubmit(data: any) {
    this.loading = true;
    let formData: any = new FormData();
    Object.keys(data).forEach(field => {
      formData.append(field, this.formGroup.get(field)?.value);    
    });
    formData.append('_captcha', 'false');
    this.contactService.sendEmail(formData).subscribe({
      next: () => {
        this.success = true;
        this.loading = false;
        this.formGroup.reset();
      },
      error: () => this.loading = false,
    });
  }

  allTags(){
    this.meta.addTag({ name: 'title', content: 'Contactez l’association franco-japonais Gengoffee via le formulaire'});
    this.meta.addTag({ name: 'description', content: 'Futur participant ? Futur partenaire ? Contactez-nous pour nous expliquer vos envies ou projets à propos de nos échanges de langue à Paris ou Tokyo.'});
  }

}
