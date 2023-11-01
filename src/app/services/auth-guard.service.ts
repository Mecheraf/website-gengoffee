import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, filter, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  constructor(
    private http: HttpClient,
    private cookieService : CookieService
  ) { }
  private url = environment.API_URL

  public isAuthorized(options?: any):Observable<any> { 
    options = {
      ...options,
      headers: {
        "Authorization":"Bearer "+this.cookieService.get("token")
      }
    }
    return this.http.get<any>(this.url+"authorize", options);
  }
}
