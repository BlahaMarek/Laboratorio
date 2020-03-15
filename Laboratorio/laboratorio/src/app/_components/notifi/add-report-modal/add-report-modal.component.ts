import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from 'src/app/_shared/services/task.service';
import { Task } from 'src/app/_models/Task';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/_shared/services/user.service';

@Component({
  selector: 'app-add-report-modal',
  templateUrl: './add-report-modal.component.html',
  styleUrls: ['./add-report-modal.component.scss']
})
export class AddReportModalComponent implements OnInit {
  item: String;
  group: String = null;
  groups: [{_id: String; group: String;}]
  tasks: Task[];

  constructor(private taskSvc: TaskService,
              private userSvc: UserService,
              private _snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<AddReportModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.tasks = this.data.tasks;
    this.groups = this.userSvc.user['user'].groups;
  }

  addItem(task: Task) {
    if ( this.data.title == 'Moje úlohy' ) {
      this.taskSvc.createTask(task).subscribe(data => {
        this.tasks.push(data);
        this.taskSvc.setMyTasks(this.tasks);
      })
    } else if (this.data.title == 'Oznamy') {
      this.taskSvc.createTask(task).subscribe(data => {
        this.tasks.push(data);
        this.taskSvc.setReports(this.tasks);
      })
    } else {
      this.taskSvc.createTask(task).subscribe(data => {
        this.tasks.push(data);
        this.taskSvc.setLabTasks(this.tasks);
      })
    }

  }

  onSave() {
    let newTask:Task = new Task();
    newTask.desc = this.item;
    newTask.done = false;
    newTask.personRef = this.data.title == 'Moje úlohy' ?  this.userSvc.user['user']._id : null;
    newTask.report = this.data.title == 'Oznamy' ?  true : false;
    newTask.group = this.group;
    this.item = null;
    this.addItem(newTask);
    this.dialogRef.close();
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
