import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private mailThisApi = 'https://formsubmit.co/4c829c560b64967a3ac2d6197e314f22';
  constructor(private http: HttpClient) { }

  sendEmail(data: FormData) {
    return this.http.post(this.mailThisApi, data);
  }
}
