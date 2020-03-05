import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/_models/Task';
import { TaskService } from 'src/app/_shared/services/task.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
  @Input() tasks: Task[];
  constructor(
  ) { }

  ngOnInit(): void {
  }

}
