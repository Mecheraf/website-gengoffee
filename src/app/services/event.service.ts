import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Event } from '../models/event';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient, private cookieService:CookieService) { }
  private url = environment.API_URL


  public getPastEvents(options?: any) { 
    return this.http.get<Event[]>(this.url+"getPastEvents", options);
  }
  public getCountEvents(options?: any) { 
    return this.http.get<Event>(this.url+"getCountEvents", options); 
  }
  public getNextEvents(options?: any) { 
    return this.http.get<Event[]>(this.url+"getNextEvents", options); 
  }
  public post(data: any, options?: any) { 
    options = {
      ...options,
      headers: {
        "Authorization":"Bearer "+this.cookieService.get("token")
      }
    }
    return this.http.post(this.url+"insertevent", data, options); 
  } 
  public put(url: string, data: any, options?: any) { 
   return this.http.put(url, data, options); 
  } 
  public delete(url: string, options?: any) { 
  return this.http.delete(url, options); 
  } 

  
}
