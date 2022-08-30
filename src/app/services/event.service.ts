import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }
  private url = environment.API_URL

  public get(url: string, options?: any) { 
    return this.http.get(url, options); 
  } 
  public post(data: any, options?: any) { 
    return this.http.post(this.url+"insertevent", data, options); 
  } 
  public put(url: string, data: any, options?: any) { 
   return this.http.put(url, data, options); 
  } 
  public delete(url: string, options?: any) { 
  return this.http.delete(url, options); 
  } 
}
