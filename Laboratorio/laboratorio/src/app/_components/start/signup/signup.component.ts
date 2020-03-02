import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/_shared/services/user.service';

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
  constructor(private userSvc: UserService) { }

  ngOnInit(): void {
  }

  registerUser() {
    if (this.profileForm.get('password').value !== this.profileForm.get('confirm').value) {
      return false;
    }

    const user = {
      login: this.profileForm.get('login').value,
      email: this.profileForm.get('email').value,
      password: this.profileForm.get('password').value
    }

    this.userSvc.createUser(user).subscribe((userr) => console.log(userr), (err) => console.log(err));
  }

}
