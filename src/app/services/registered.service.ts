import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';



@Injectable({
  providedIn: 'root'
})
export class RegisteredService {



  constructor(private http: HttpClient, private cookieService:CookieService) { }
  private url = environment.API_URL
  
  private headers = {
    headers: {
     "Authorization":"Bearer "+this.cookieService.get("token")
    }
   }

  public getRegisteredList(options?: any):Observable<any> {
    options =  {...options, 
      headers: {'Authorization':'Bearer '+this.cookieService.get("token")}
    }
    return this.http.get<Event>(this.url+"getRegisteredList", options)
  }

  public updateAttendee(data: any, options?: any) { 
    return this.http.put(this.url+"updateAttendee", data, options); 
  } 

}
