import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Calendar } from 'src/app/_models/Calendar';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  baseUrl: string = 'http://localhost:3000/calendar/';

  private _myCalendar = new BehaviorSubject([])
  $myCalendar: Observable<Calendar[]> = this._myCalendar.asObservable();

  
  constructor(private http: HttpClient) { }

  loadMyCalendar(id) {
    this.http.get<any>(this.baseUrl + `${id}`).subscribe(data => this._myCalendar.next(data));
  }

  setCalendar(val: Calendar[]) {
    this._myCalendar.next(val);
  }

  addToCalendar(val: Calendar) {
    this.http.post<any>(this.baseUrl, val).subscribe(data => {
      const newData = this._myCalendar.getValue().concat(data);
      this.setCalendar(newData);
    }
    );
  }

  doneItem(id) {
    this.http.patch<any>(this.baseUrl + `date/`, {id}).subscribe(data => {
      const filteredData = this._myCalendar.getValue().filter(item => item._id != id);
      const newData = filteredData.concat(data);
      this.setCalendar(newData);
    });
  }
  deleteItem(id: String) {
    this.http.delete<any>(this.baseUrl + `${id}`).subscribe(data => {
      this.setCalendar(this._myCalendar.getValue().filter(item => item._id != id));
    });
  }
}
