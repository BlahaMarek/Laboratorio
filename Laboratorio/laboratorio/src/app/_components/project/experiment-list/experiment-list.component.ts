import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/_shared/services/project.service';
import { UserService } from 'src/app/_shared/services/user.service';
import { Project } from 'src/app/_models/Project';
import { MatDialog } from '@angular/material/dialog';
import { ExperimentModalComponent } from '../experiment-modal/experiment-modal.component';

@Component({
  selector: 'app-experiment-list',
  templateUrl: './experiment-list.component.html',
  styleUrls: ['./experiment-list.component.scss']
})
export class ExperimentListComponent implements OnInit {
  @Input() project = null;
  @Input() id: String = "";
  @Input() projectDate: string = "";
  
  constructor(private router: Router, private route: ActivatedRoute, public projectSvc: ProjectService, public userSvc: UserService, public dialog: MatDialog) { 
  }

  ngOnInit(): void {
    this.projectSvc.$currentProject.subscribe(data => {
      if (!!data && !!data['name']) {
        this.project = data;
      }
    })
  }

  addExperiment() {
    const dialogRef = this.dialog.open(ExperimentModalComponent, {
      width: '800px',
      data: {edit: true, id: this.id, date: this.projectDate, project: this.project}
    })
  }
  openExperiment(experiment) {
    const dialogRef = this.dialog.open(ExperimentModalComponent, {
      width: '800px',
      data: {edit: false, id: this.id, date: this.projectDate, experiment: experiment}
    })
  }

}
