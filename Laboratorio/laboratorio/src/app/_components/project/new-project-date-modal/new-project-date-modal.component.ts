import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from 'src/app/_shared/services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-project-date-modal',
  templateUrl: './new-project-date-modal.component.html',
  styleUrls: ['./new-project-date-modal.component.scss']
})
export class NewProjectDateModalComponent implements OnInit {
  date: Date;
  projectId: string;

  constructor(
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<NewProjectDateModalComponent>,
    private projectSvc: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.projectId = this.data.id;
  }

  save() {
    this.date.setDate(this.date.getDate() + 1)
    this.projectSvc.postNewDate(this.projectId,this.date.toISOString().substring(0,10)).subscribe((data) => {
      this.projectSvc.setCurrentProject(data);
    })
    this.dialogRef.close();
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
