import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Event } from '../models/event';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient) { }
  private url = environment.API_URL


  public getJobs(options?: any) { 
    return this.http.get<Event[]>(this.url+"getjobs", options);
  }
  public insertJob(data: any, options?: any) { 
    /*options = {
      ...options,
      headers: {
        "Authorization":"Bearer "+this.cookieService.get("token")
      }
    }*/
    return this.http.post(this.url+"insertjob", data, options); 
  } 
  
  public put(url: string, data: any, options?: any) { 
   return this.http.put(url, data, options); 
  } 
  public delete(url: string, options?: any) { 
  return this.http.delete(url, options); 
  } 

  
}
