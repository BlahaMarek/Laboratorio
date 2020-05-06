import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from 'src/app/_shared/services/task.service';
import { UserService } from 'src/app/_shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-group-changer',
  templateUrl: './group-changer.component.html',
  styleUrls: ['./group-changer.component.scss']
})
export class GroupChangerComponent implements OnInit {
  users = [];
  ready = false;
  userSelected = null;
  groups = [];
  newGroup = "";
  addGroup = ""

  constructor(private taskSvc: TaskService,
    public userSvc: UserService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<GroupChangerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.userSvc.loadMySlaves();
    this.userSvc.$mySlaves.subscribe(users => { this.users = users; this.ready = true; });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  userClicked(user) {
    if (!user) {
      return;
    }

    this.groups = user.groups;
  }

  deleteGroup(group) {
    this.dialogRef.close();
    this.userSvc.removeGroup(this.userSelected._id, group.group).subscribe(user => this.userSelected = user);
  }

  save() {
    this.userSvc.addGroup(this.userSvc.user['user']._id, this.newGroup).subscribe(user => {this.userSvc.user['user'] = user; });
    this.userSvc.loadMyColaborators();
    this.dialogRef.close();
  }

  addGroupToUser() {
    this.userSvc.addGroup(this.userSelected._id, this.addGroup).subscribe(user => this.userSelected = user);
    this.userSvc.loadMyColaborators();
    this.dialogRef.close();
  }
}
