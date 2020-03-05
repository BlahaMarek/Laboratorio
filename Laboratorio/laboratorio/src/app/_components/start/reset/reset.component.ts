import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  profileForm = new FormGroup({
    login: new FormControl('', Validators.required),
  });
  constructor(
    private router: Router,
    private userSvc: UserService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  validateCardinalities() {
    this.userSvc.resetPassword(this.profileForm.get('login').value).subscribe((data) => {
      this.router.navigate(['/login']);
    }, (err) => {
      this._snackBar.open("Nepodarilo sa resetovať heslo. Skúste to neskôr.", '', {
        duration: 2000,
      });
    })
  }

}
