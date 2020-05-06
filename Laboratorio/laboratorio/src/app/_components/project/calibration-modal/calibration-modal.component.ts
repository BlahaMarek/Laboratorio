import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-calibration-modal',
  templateUrl: './calibration-modal.component.html',
  styleUrls: ['./calibration-modal.component.scss']
})
export class CalibrationModalComponent implements OnInit {
  @Input()dataForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<CalibrationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}


  ngOnInit(): void {
    this.dataForm = this.formBuilder.group({
      data: this.formBuilder.array([this.createItem()])
    });
  }
  
  createItem() {
    return this.formBuilder.group({
      x: [null, Validators.required],
      y: [null, Validators.required]
    });
  }

  sendClicked(e) {
    this.dialogRef.close();
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
