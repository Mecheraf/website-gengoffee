import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-loginAdmin',
  templateUrl: './loginAdmin.component.html',
  styleUrls: ['./loginAdmin.component.css']
})
export class LoginAdminComponent implements OnInit {

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    private loginService: LoginService,
    private cookieService: CookieService,
    private router: Router,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.meta.addTag({ name: 'robots', content: 'noindex, nofollow' });
  }


  onSubmit(){
    const username:string = this.loginForm.get('username')?.value
    const password:string = this.loginForm.get('password')?.value;
    this.loginService.post(this.loginForm.value).subscribe((response:any) => {
      if(response){
        this.cookieService.set('token', response.token, {secure:true})
        this.router.navigate(['admin/registered']);
      }
    }); 
  }
}
