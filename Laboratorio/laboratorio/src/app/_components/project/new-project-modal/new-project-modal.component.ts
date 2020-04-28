import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/_shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/_shared/services/project.service';

@Component({
  selector: 'app-new-project-modal',
  templateUrl: './new-project-modal.component.html',
  styleUrls: ['./new-project-modal.component.scss']
})
export class NewProjectModalComponent implements OnInit {

  projectForm =  new FormGroup({
    startDate: new FormControl(null , [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    group: new FormControl(null, [Validators.required]),
  });

  constructor(
    public userSvc: UserService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<NewProjectModalComponent>,
    private projectSvc: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

  save() {
    this.projectSvc.postProject({...this.projectForm.value}).subscribe(() => {
      this.projectSvc.loadMyProjects();
    })
    this.dialogRef.close();
  }

  onNoClick() {
    this.dialogRef.close();
  }


}
