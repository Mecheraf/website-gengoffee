import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  constructor(
    private cookieService : CookieService
  ) { }

  async checkToken(){
    let token = this.cookieService.get('token')
    if(token){
      //Validation du token à faire dans le back
      console.log(token)
      //Si valide, isloggedin = true

      this.isLoggedIn = true;
    }
  }
  
  async isAuthenticated(){
    await this.checkToken()
    return this.isLoggedIn;
  }
}
