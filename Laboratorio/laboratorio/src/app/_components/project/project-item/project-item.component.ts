import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Project } from 'src/app/_models/Project';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/_shared/services/project.service';
import { UserService } from 'src/app/_shared/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { NewProjectDateModalComponent } from '../new-project-date-modal/new-project-date-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit, OnDestroy {
  project: Project = null;
  id: String = "";
  datesArray = [];
  subs: Subscription;
  constructor( public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private projectSvc: ProjectService, public userSvc: UserService) { 
    this.id = this.route.snapshot.paramMap.get('id');
  }

  onBackClicked() {
    this.router.navigate(['/lab']);
  }
  showDataByDate(date) {
    this.router.navigate([`/lab/project/${this.id}/${date}`]);
  }

  addNewDate() {
    const dialogRef = this.dialog.open(NewProjectDateModalComponent, {
      width: '600px',
      data: {edit: true, id: this.id}
    })
  }

  ngOnInit() {
    this.projectSvc.getProjectById(this.id).subscribe(data => {
      this.project = data;
      this.projectSvc.setCurrentProject(data);
      this.projectSvc.loadMyProjects();
    })

    this.subs = this.projectSvc.$currentProject.subscribe(data => {
      this.datesArray = !!data['workDates'] ? Object.keys(data['workDates']).reverse() : [];
    })
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
