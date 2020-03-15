import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_shared/services/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(public userSvc: UserService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openGroups() {
    let dialogRef = this.dialog.open(ProfileComponent, {
      width: '600px',
      data: {user: this.userSvc.user}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  openProfile() {
    let dialogRef = this.dialog.open(ProfileComponent, {
      width: '600px',
      data: {user: this.userSvc.user}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  logoutUser() {
    this.userSvc.logoutUser().subscribe(() => {
      // localStorage.clear(); // zabije vsetko v localstorage
      localStorage.removeItem('currentUser');
      this.userSvc.user = null;
      this.router.navigate(['/']);
    }, err =>{
      console.log('Nepodarilo sa odhlasit')
    })
  }
}
