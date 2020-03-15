import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/_models/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/_shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  roles: String[];
  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl(''),
    passwordConfirm: new FormControl(''),
  });
  constructor(
    private userSvc: UserService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() :void {
    console.log(this.data.user)
    this.roles = this.data.user.user.roles.map(item => item.role);
    console.log(this.roles);
    this.profileForm.get('email').setValue(this.data.user.user.email);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onSaveClick(): void {
    if (this.profileForm.get('password').dirty && this.profileForm.get('password').value.length < 8) {
      this._snackBar.open("Minimálna dĺžka hesla je 8 znakov", '', {
        duration: 2000,
      });
    }
    if (this.profileForm.get('passwordConfirm').value != this.profileForm.get('password').value) {
      this._snackBar.open("Zadane heslá sa nezhodujú", '', {
        duration: 2000,
      });
    }

    if (this.profileForm.dirty) {
      let user = {};
      user['password'] = this.profileForm.get('password').value;
      user['email'] = this.profileForm.get('email').value;
      this.userSvc.updateProfile(user, this.data.user.user._id).subscribe( updatedUser => {
        console.log(this.userSvc.user)
        console.log(updatedUser);
        this.userSvc.user['user'] = updatedUser;
        console.log(this.userSvc.user);
      })
    }
    this.dialogRef.close();
  }
}
