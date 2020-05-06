import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_shared/services/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';
import { GroupChangerComponent } from '../group-changer/group-changer.component';
import { CalibrationModalComponent } from '../project/calibration-modal/calibration-modal.component';
import { CalibrationDetailModalComponent } from '../project/calibration-detail-modal/calibration-detail-modal.component';

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
    let dialogRef = this.dialog.open(GroupChangerComponent, {
      width: '600px',
      data: {user: this.userSvc.user}
    });

    dialogRef.afterClosed().subscribe(result => {
    })
  }

  openCalibrations() {
    let dialogRef = this.dialog.open(CalibrationModalComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
    })
  }

  openNotEditableCalibrations() {
    let dialogRef = this.dialog.open(CalibrationDetailModalComponent, {
      width: '800px',
      data: {edit: false}
    });

    dialogRef.afterClosed().subscribe(result => {
    })
  }

  openProfile() {
    let dialogRef = this.dialog.open(ProfileComponent, {
      width: '600px',
      data: {user: this.userSvc.user}
    });

    dialogRef.afterClosed().subscribe(result => {
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
