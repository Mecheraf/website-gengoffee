import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RegisteredService {

  constructor(private http: HttpClient) { }
  private url = environment.API_URL
  
  public getRegisteredList(options?: any):Observable<any> {
    return this.http.get<Event>(this.url+"getRegisteredList", options)
  }

}
