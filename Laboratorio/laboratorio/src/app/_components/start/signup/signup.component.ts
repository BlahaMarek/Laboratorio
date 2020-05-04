import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/_shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  profileForm = new FormGroup({
    login: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirm: new FormControl('', Validators.required),
  });
  constructor(private userSvc: UserService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  registerUser() {
    if (this.profileForm.get('password').value !== this.profileForm.get('confirm').value) {
      this._snackBar.open("Zadané heslá sa nezhodujú", '', {
        duration: 2000,
      });
      return false;
    }

    const user = {
      login: this.profileForm.get('login').value,
      email: this.profileForm.get('email').value,
      password: this.profileForm.get('password').value
    }

    this.userSvc.createUser(user).subscribe((userr) => {this.router.navigate(['/lab'])}, (err) => console.log(err));
  }

}
