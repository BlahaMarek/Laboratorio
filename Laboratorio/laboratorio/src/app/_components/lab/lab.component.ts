import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_shared/services/user.service';
import { TaskService } from 'src/app/_shared/services/task.service';
import { Task } from 'src/app/_models/Task';
import { User } from 'src/app/_models/User';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss']
})
export class LabComponent implements OnInit {
  public user: User;
  constructor(public userSvc: UserService, public taskSvc: TaskService) {
  }

  ngOnInit(): void {
    this.user = this.userSvc.user;
    this.taskSvc.loadMyTasks(this.userSvc.user['user']._id);
    this.taskSvc.loadLabTasks(this.userSvc.user['user']._id);
    this.taskSvc.loadReports(this.userSvc.user['user']._id);
  }

}
