import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-experiment-modal',
  templateUrl: './experiment-modal.component.html',
  styleUrls: ['./experiment-modal.component.scss']
})
export class ExperimentModalComponent implements OnInit {

  dataForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<ExperimentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}


  ngOnInit(): void {
    console.log(this.data)

    this.dataForm = this.formBuilder.group({
      data: this.formBuilder.array(this.loadData())
    });

    
  }
  loadData() {
    if (!this.data.experiment) {
      return []
    }
    let arr = [];
    this.data.experiment.data.forEach(element => {
      arr.push(this.createItem(element.x, element.y, element.z))
    });
    return arr;
  }

  createItem(x, y, z) {
    return this.formBuilder.group({
      x: [{value: x, disabled: true}],
      y: [{value: y, disabled: true}],
      z: [{value: z, disabled: true}],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSaveClick() {
    
  }
}
