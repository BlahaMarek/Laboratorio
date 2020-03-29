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
    console.log(this.groups);
  }

  deleteGroup(group) {
    console.log(this.userSelected._id);
    console.log(group);
    this.userSvc.removeGroup(this.userSelected._id, group.group).subscribe();
  }

  save() {
    console.log(this.newGroup);
    this.dialogRef.close();
    this.userSvc.addGroup(this.userSvc.user['user']._id, this.newGroup).subscribe();
  }
}
