import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RegisteredService {

  constructor(private http: HttpClient) { }
  private url = environment.API_URL

  public get(options?: any) { 
    return this.http.get<Event>(this.url+"getRegisteredList", options); 
  }

}
