import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';



@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }
  private url = environment.API_URL

  public get(options?: any) { 
    return this.http.get<Event>(this.url+"getEvents", options); 
  }
  public getId(options?: any) { 
    return this.http.get<Event>(this.url+"getRegisteredById", options); 
  }
  public post(data: any, options?: any) { 
    return this.http.post(this.url+"registerEvent", data, options); 
  } 
  public put(url: string, data: any, options?: any) { 
   return this.http.put(url, data, options); 
  } 
  public delete(url: string, options?: any) { 
    return this.http.delete(url, options); 
  } 

}
