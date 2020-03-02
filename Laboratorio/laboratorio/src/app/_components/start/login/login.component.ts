import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_shared/services/user.service';

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
    private userSvc: UserService
  ) { }

  ngOnInit(): void {
  }

  validateCardinalities() {
    let user = {
      login: this.profileForm.get('login').value,
      password: this.profileForm.get('password').value
    }

    this.userSvc.loginUser(user).subscribe((data) => {
      this.router.navigate(['/projects']);
    }, (err) => {
      console.log(err);
    })
  }

}
