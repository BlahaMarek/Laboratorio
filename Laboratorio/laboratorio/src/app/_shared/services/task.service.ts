import { Injectable } from '@angular/core';
import { Task } from 'src/app/_models/Task';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseUrl: string = 'http://localhost:3000/tasks/';

  private _myTasks = new BehaviorSubject([])
  private _labTasks = new BehaviorSubject([])
  private _reports = new BehaviorSubject([])

  $myTasks: Observable<any> = this._myTasks.asObservable();
  $labTasks: Observable<any> = this._labTasks.asObservable();
  $reports: Observable<any> = this._reports.asObservable();

  constructor(private http: HttpClient) { }

  loadMyTasks(id) {
    this.http.get<any>(this.baseUrl + `me/${id}`).subscribe(data => this._myTasks.next(data));
  }
  loadLabTasks(id) {
    this.http.get<any>(this.baseUrl + `lab/${id}`).subscribe(data => this._labTasks.next(data));
  }
  loadReports(id) {
    this.http.get<any>(this.baseUrl + `reports/${id}`).subscribe(data => this._reports.next(data));
  }

  setMyTasks(val: Task[]) {
    this._myTasks.next(val);
  }
  setLabTasks(val: Task[]) {
    this._labTasks.next(val);
  }
  setReports(val: Task[]) {
    this._reports.next(val);
  }

  createTask(task) {
    return this.http.post<any>(this.baseUrl, task);
  }

  removeTask(taskId: String) {
    this.http.delete<any>(this.baseUrl + taskId).subscribe();
  }

}
