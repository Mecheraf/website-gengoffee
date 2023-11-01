import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  private url = environment.API_URL

  public post(data: any, options?: any):Observable<any> { 
    return this.http.post(this.url+"loginadmin", data, options); 
  } 
}
