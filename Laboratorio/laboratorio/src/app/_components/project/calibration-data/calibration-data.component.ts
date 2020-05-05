import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ProjectService } from 'src/app/_shared/services/project.service';
import { Calibration } from 'src/app/_models/Calibration';

@Component({
  selector: 'app-calibration-data',
  templateUrl: './calibration-data.component.html',
  styleUrls: ['./calibration-data.component.scss']
})
export class CalibrationDataComponent implements OnInit {
  @Input() dataForm: FormGroup;
  data: FormArray;
  r2 = null;
  func = null;
  name = null;
  a = null;
  b = null;

  constructor(private formBuilder: FormBuilder, private projectSvc: ProjectService) { }

  ngOnInit(): void {
  }

  createItem() {
    return this.formBuilder.group({
      x: null,
      y: null
    });
  }

  addItem(): void {
    this.data = this.dataForm.get('data') as FormArray;
    this.data.push(this.createItem());
  }

  getControls() {
    return (this.dataForm.get('data') as FormArray).controls;
  }

  calcRegression() {
    let data = this.dataForm.value.data.map(item => {
      return [item.x, item.y]
    })

    this.projectSvc.calculateRegression(data).subscribe(e => {
      this.r2 = e.r2;
      this.func = e.string;
      this.a = e.equation[0];
      this.b = e.equation[1];
    })
  }

  saveCalibration() {
    if (!this.name) {
      return;
    }
    const calibration = new Calibration()
    calibration.a = this.a;
    calibration.b = this.b;
    calibration.r = this.r2;
    calibration.name = this.name;
    calibration.data = this.dataForm.value.data;

    console.log(calibration);

    this.projectSvc.postCalibration(calibration).subscribe(data => {
      console.log(data);
    })
  }
}
