import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Message } from 'src/app/_models/Message';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  baseUrl: string = 'http://localhost:3000/messages';
  socketUrl: string = 'http://localhost:3000';
  socket: any;

  constructor(private http: HttpClient) {
    this.socket = io(this.socketUrl);  
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      })
    })
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  getMessages(from: string, to: string) {
    let params = new HttpParams();
    params = params.append('from', from);
    params = params.append('to', to);
    return this.http.get<any>(this.baseUrl, {params});
  }
  getGroupMessages() {
    return this.http.get<any>(this.baseUrl + '/group');
  }

  postMessage(message: Message) {
    return this.http.post<any>(this.baseUrl, message);
  }
}
