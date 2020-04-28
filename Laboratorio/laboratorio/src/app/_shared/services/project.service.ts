import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from 'src/app/_models/Project';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl: string = 'http://localhost:3000/projects/';

  private _myProjects = new BehaviorSubject([])
  $myProjects: Observable<Project[]> = this._myProjects.asObservable();

  private _currentProject = new BehaviorSubject({})
  $currentProject = this._currentProject.asObservable();

  
  constructor(private http: HttpClient) { }

  loadMyProjects() {
    this.http.get<any>(this.baseUrl).subscribe(data => this._myProjects.next(data));
  }

  setCurrentProject(val: Project) {
    this._currentProject.next(val);
    console.log(this._currentProject.getValue())
  }
  
  setProject(val: Project[]) {
    this._myProjects.next(val);
    console.log(this._myProjects.getValue())
  }

  getProjectById(_id): Observable<Project> {
    return this.http.get<any>(this.baseUrl + _id);
  }

  postProject(project: Project) {
    return this.http.post<any>(this.baseUrl, project);
  }
  
  postNewDate(_id, date) {
    return this.http.post<any>(`${this.baseUrl}newdate/${_id}`, {date});
  }

  postComent(_id, comment: {date: Date; person: String; comentBody: String;}, date) {
    return this.http.post<any>(this.baseUrl + _id + '/comment', {comment, date});
  }
}
