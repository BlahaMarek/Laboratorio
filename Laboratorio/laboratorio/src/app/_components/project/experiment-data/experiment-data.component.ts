import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/_shared/services/project.service';
import { Calibration } from 'src/app/_models/Calibration';

@Component({
  selector: 'app-experiment-data',
  templateUrl: './experiment-data.component.html',
  styleUrls: ['./experiment-data.component.scss']
})
export class ExperimentDataComponent implements OnInit {

  @Input() dataForm: FormGroup;
  @Input() edit: boolean = true;
  @Input() experiment = null;
  data: FormArray;
  desc: string = "";
  calibrations: Calibration[];
  currentCalibration: Calibration = null;
 

  constructor(private formBuilder: FormBuilder, private projectSvc: ProjectService) { }

  ngOnInit(): void {
    this.projectSvc.getCalibrations().subscribe(data => {
      this.calibrations = data;
    })
  }

  createItem() {
    return this.formBuilder.group({
      x: [null, Validators.required],
      y: [null],
      z: [null, Validators.required]
    });
  }

  addItem(): void {
    this.data = this.dataForm.get('data') as FormArray;
    this.data.push(this.createItem());
  }

  getControls() {
    return (this.dataForm.get('data') as FormArray).controls;
  }

  calibrationClicked(calibration) {
    this.projectSvc.experimentCalibration = calibration.name;
  }

  onNameBlur() {
    this.projectSvc.experimentName = this.desc;
  }

  calcConcentration() {
    this.getControls().forEach( item => {
      item.get('y').patchValue(this.equation(item))
    })
  }
  
  equation(item) : number {
    let a = this.currentCalibration.a;
    let b = this.currentCalibration.b;
    let A = item.get('z').value;
    let C = Math.round(((A - b) / a) * 10000 ) / 10000
    return C;
  }

  get isDisabled() {
    if ((<FormArray>this.dataForm.get('data')).controls.length < 3) {
      return true
    }
    return !this.dataForm.valid || !this.currentCalibration;
  }

}
