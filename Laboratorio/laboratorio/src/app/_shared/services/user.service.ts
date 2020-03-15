import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/_models/User';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = 'http://localhost:3000/users';
  user: User;
  
  constructor(private http: HttpClient) {}
  

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

  getLoginStatus():boolean {
    return !!this.user;
  }

  isSkolitel():boolean {
    if (!this.user['user'].roles.length) {
      return false;
    }
    return this.user['user'].roles.map(item => item.role).includes('ROLE_SKOLITEL')
  }
}
