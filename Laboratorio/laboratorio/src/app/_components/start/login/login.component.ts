import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  profileForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private router: Router,
    private userSvc: UserService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
      this.userSvc.user = JSON.parse(currentUser);
      // this.router.navigate(['/lab']);
      this.router.navigate(['/lab/project/5eaaea87414e5327ac56894b/2020-05-06']);
    }
  }

  validateCardinalities() {
    let user = {
      login: this.profileForm.get('login').value,
      password: this.profileForm.get('password').value
    }

    this.userSvc.loginUser(user).subscribe((data) => {
      this.router.navigate(['/lab']);
    }, (err) => {
      this._snackBar.open("Nesprávne prihlasovacie údaje", '', {
        duration: 2000,
      });
    })
  }

}
