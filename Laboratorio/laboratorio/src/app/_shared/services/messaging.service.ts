import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Message } from 'src/app/_models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  baseUrl: string = 'http://localhost:3000/messages';

  constructor(private http: HttpClient) { }

  getMessages(from: string, to: string) {
    let params = new HttpParams();
    params = params.append('from', from);
    params = params.append('to', to);
    return this.http.get<any>(this.baseUrl, {params});
  }

  postMessage(message: Message) {
    return this.http.post<any>(this.baseUrl, message);
  }
}
