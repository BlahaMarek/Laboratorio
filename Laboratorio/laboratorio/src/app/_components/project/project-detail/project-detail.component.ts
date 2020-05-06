import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/_shared/services/project.service';
import { UserService } from 'src/app/_shared/services/user.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Project } from 'src/app/_models/Project';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: Project = null;
  id: String = "";
  projectDate: string = "";

  constructor(private router: Router, private route: ActivatedRoute, private projectSvc: ProjectService, public userSvc: UserService) { 
    this.id = this.route.snapshot.paramMap.get('id');
    this.projectDate = this.route.snapshot.paramMap.get('date');
  }

  public Editor = ClassicEditor;
  editorData: String = "";

  conf = {
    toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList','underline', 'strikethrough', 'code','subscript', 'superscript' ],
    heading: {
        options: [
            { model: 'paragraph', title: 'Paragraf', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Nadpis 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Nadpis 2', class: 'ck-heading_heading2' }
        ]
    }
  }
  
  ngOnInit() {
    this.projectSvc.getProjectById(this.id).subscribe(data => {
      this.project = data;
      this.projectSvc.loadMyProjects();
    })
  }

  addDocumentToProject() {
    this.projectSvc.postComent(this.id, {comentBody: this.editorData, person: this.userSvc.user['user'].login, date: new Date()}, this.projectDate)
                   .subscribe( data => {
                      this.editorData = "";
                      this.project = data;
                    });
  }

  formatDate (date) {
    return new Date(date).toDateString();
  }

  onBackClicked() {
    this.router.navigate([`/lab/project/${this.id}`]);
  }
}
