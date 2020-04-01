import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/_models/User';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = 'http://localhost:3000/users';
  user: User;

  private _mySlaves = new BehaviorSubject([])

  $mySlaves: Observable<any> = this._mySlaves.asObservable();
  
  constructor(private http: HttpClient) {}
  
  loadMySlaves() {
    const myId = this.user['user']._id;
    this.http.get<any>(this.baseUrl + `/slaves/${myId}`).subscribe(data => {this._mySlaves.next(data); console.log(data)});
  }

  createUser(user) {
    return this.http.post<any>(this.baseUrl, user).pipe(
      map( usr => {
        console.log(usr);
        localStorage.setItem('currentUser', JSON.stringify(usr));
        this.user = usr}
        )
    );
  }

  loginUser(user) {
    return this.http.post<any>(this.baseUrl + '/login', user).pipe(
      map( usr => {
        console.log(usr);
        localStorage.setItem('currentUser', JSON.stringify(usr));
        this.user = usr}
        )
    );
  }

  logoutUser() {
    return this.http.post<any>(this.baseUrl + '/logout', {});
  }
  
  resetPassword(login) {
    return this.http.post<any>(this.baseUrl + '/reset', {login});
  }
  
  updateProfile(user, id) {
    return this.http.patch<any>(this.baseUrl + `/${id}`, user);
  }
  
  addGroup(id, group) {
    return this.http.get<any>(this.baseUrl + `/${id}/${group}`);
  }
  
  removeGroup(id, group) {
    return this.http.delete<any>(this.baseUrl + `/${id}/${group}`);
  }






  getLoginStatus():boolean {
    return !!this.user;
  }

  getGroups(): String[] {
    return this.user['user'].groups.map(group => group.group);
  }

  isSkolitel():boolean {
    if (!this.user['user'].roles.length) {
      return false;
    }
    return this.user['user'].roles.map(item => item.role).includes('ROLE_SKOLITEL')
  }
}
