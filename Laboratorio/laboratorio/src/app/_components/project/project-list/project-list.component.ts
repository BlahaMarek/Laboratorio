import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/_models/Project';
import { ProjectService } from 'src/app/_shared/services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  constructor(private projectSvc: ProjectService) { }

  ngOnInit(): void {
    this.projectSvc.loadMyProjects();
    this.projectSvc.$myProjects.subscribe(data => {console.log(data); this.projects = data})
  }

  addProject() {
    
  }
}
