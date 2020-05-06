import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from 'src/app/_models/Project';
import { ProjectService } from 'src/app/_shared/services/project.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NewProjectModalComponent } from '../new-project-modal/new-project-modal.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
 
  constructor(private projectSvc: ProjectService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.projectSvc.loadMyProjects();
    this.projectSvc.$myProjects.subscribe(data => { this.projects = data})
  }

  addProject() {
    const dialogRef = this.dialog.open(NewProjectModalComponent, {
      width: '600px',
      data: {edit: true, item: new Project()}
    })
  }

  concreteProject(_id) {
    this.router.navigate(['/lab/project', _id]);
  }
}
