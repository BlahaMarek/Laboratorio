import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/_models/Task';
import { TaskService } from 'src/app/_shared/services/task.service';
import { UserService } from 'src/app/_shared/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddReportModalComponent } from '../add-report-modal/add-report-modal.component';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
  @Input() tasks$: any;
  @Input() title: String;
  @Input() type: String;
  @Input() canEdit: Boolean = false;

  data: Task[];
  constructor(
    private userSvc: UserService, private taskSvc: TaskService, public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.tasks$.subscribe(tasks => {
      this.data = tasks;
    });
  }

  addItem() {
    const dialogRef = this.dialog.open(AddReportModalComponent, {
      width: '600px',
      data: {title: this.title, tasks: this.data, type: this.type}
    })
  }

  removeItem(task) {
    this.data = this.data.filter(item => item._id != task._id);
    switch (this.type) {
      case 'my':
        this.taskSvc.setMyTasks(this.data);
        break;
      case 'lab':
        this.taskSvc.setLabTasks(this.data);
        break;
      case 'reports':
        this.taskSvc.setReports(this.data);
        break;
      default:
        break;
    }
    this.taskSvc.removeTask(task._id);
  }

  doneItem(task) {
    const doneItem = this.data.find(item => item._id == task._id)
    doneItem.done = true;
    this.data = this.data.filter(item => item._id != task._id);
    this.data.push(doneItem);
    switch (this.type) {
      case 'my':
        this.taskSvc.setMyTasks(this.data.concat());
        break;
      case 'lab':
        this.taskSvc.setLabTasks(this.data);
        break;
      case 'reports':
        this.taskSvc.setReports(this.data);
        break;
      default:
        break;
    }
    this.taskSvc.doneTask(task._id);
  }

}

