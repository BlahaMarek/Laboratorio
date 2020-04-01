import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from 'src/app/_models/Project';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl: string = 'http://localhost:3000/projects/';

  private _myProject = new BehaviorSubject([])
  $myProject: Observable<Project[]> = this._myProject.asObservable();

  
  constructor(private http: HttpClient) { }

  loadMyCalendar(id) {
    this.http.get<any>(this.baseUrl + `${id}`).subscribe(data => this._myProject.next(data));
  }

  setCalendar(val: Project[]) {
    this._myProject.next(val);
    console.log(this._myProject.getValue())
  }
}
