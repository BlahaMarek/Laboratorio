import { Injectable } from '@angular/core';
import { Task } from 'src/app/_models/Task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  myTasks: Task[] = [
    {
      _id: 'askdaskldas;klmdas;',
      desc: 'sprav toto',
      done: false,
      personRef: '5e4b0e130d302c42a4e9e591'
    },
    {
      _id: 'askdaskldas;klmdas;',
      desc: 'sprav toto 2',
      done: false,
      personRef: '5e4b0e130d302c42a4e9e591'
    },
    {
      _id: 'askdaskldas;klmdas;',
      desc: 'sprav toto 3',
      done: false,
      personRef: '5e4b0e130d302c42a4e9e591'
    },
  ]
  labTasks: Task[] = [
    {
      _id: 'askdaskldas;klmdas;',
      desc: 'sprav toto',
      done: false,
      personRef: ''
    },
    {
      _id: 'askdaskldas;klmdas;',
      desc: 'sprav toto 2',
      done: false,
      personRef: ''
    },
    {
      _id: 'askdaskldas;klmdas;',
      desc: 'sprav toto 3',
      done: false,
      personRef: ''
    },
  ]
  constructor() { }

  getLabTasks() {
    return this.labTasks;
  }

  getMyTasks(id) {
    return this.myTasks;
  }
}
