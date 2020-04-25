import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/_models/Project';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/_shared/services/project.service';
import { UserService } from 'src/app/_shared/services/user.service';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
  project: Project = null;
  id: String = "";
  constructor(private route: ActivatedRoute, private projectSvc: ProjectService, public userSvc: UserService) { 
    this.id = this.route.snapshot.paramMap.get('id');
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
      console.log(this.project);
      this.projectSvc.loadMyProjects();
    })
  }

  addDocumentToProject() {
    this.projectSvc.postComent(this.id, {comentBody: this.editorData, person: this.userSvc.user['user'].login, date: new Date()})
                   .subscribe( data => {
                      this.editorData = "";
                      this.project = data;
                    });
  }

  formatDate (date) {
    return new Date(date).toDateString();
  }
}
