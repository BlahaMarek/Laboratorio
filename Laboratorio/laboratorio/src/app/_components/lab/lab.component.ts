import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_shared/services/user.service';
import { TaskService } from 'src/app/_shared/services/task.service';
import { Task } from 'src/app/_models/Task';
import { User } from 'src/app/_models/User';
import { MessagingService } from 'src/app/_shared/services/messaging.service';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss']
})
export class LabComponent implements OnInit {
  public user: User;
  constructor(public userSvc: UserService, public taskSvc: TaskService, private messageSvc: MessagingService) {
  }

  ngOnInit(): void {
    this.user = this.userSvc.user;
    this.taskSvc.loadMyTasks(this.userSvc.user['user']._id);
    this.taskSvc.loadLabTasks(this.userSvc.user['user']._id);
    this.taskSvc.loadReports(this.userSvc.user['user']._id);

    this.messageSvc.emit('login', this.userSvc.user['user'].login);

    this.messageSvc.socket.on('private_chat', (data) => {
      var username = data.username;
      var message = data.message;
    });
  }

}
