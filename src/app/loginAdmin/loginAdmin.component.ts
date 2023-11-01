import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as bcrypt from 'bcrypt';
import { environment } from 'src/environments/environment';
import { LoginService } from '../services/login.service';
import { CookieService } from 'ngx-cookie-service';

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
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
  }


  onSubmit(){
    const username:string = this.loginForm.get('username')?.value
    const password:string = this.loginForm.get('password')?.value;
    this.loginService.post(this.loginForm.value).subscribe((response:any) => {
      if(response){
        console.log(response.token)
        this.cookieService.set('token', response.token, {secure:true})
      }
    }); 
  }

  isAdmin(){
    if(1==1){
      return true
    }
    return false
  }

}
