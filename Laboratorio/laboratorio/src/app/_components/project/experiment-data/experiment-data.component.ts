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
  fileToUpload: File = null;


  constructor(private formBuilder: FormBuilder, private projectSvc: ProjectService) { }

  ngOnInit(): void {
    this.projectSvc.getCalibrations().subscribe(data => {
      this.calibrations = data;
    })
  }
  addFile() {
    document.getElementById("fileUploader").click();
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files[0];
    console.log(this.fileToUpload);

    const fileData = new FormData();
    fileData.append('file', this.fileToUpload);

    this.projectSvc.postFile(fileData).subscribe( data => {
      (this.dataForm.get('data') as FormArray).clear();
      data.filtered.forEach(element => {
        let num = element.absorbation.replace(',','.')
        this.addItem(+element.time/60, +num);
      });
    })
  }

  createItem(x=null, z=null) {
    return this.formBuilder.group({
      x: [x, Validators.required],
      y: [null],
      z: [z, Validators.required]
    });
  }

  addItem(x=null, z=null): void {
    this.data = this.dataForm.get('data') as FormArray;
    this.data.push(this.createItem(x,z));
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
    this.getControls().forEach(item => {
      item.get('y').patchValue(this.equation(item))
    })
  }

  equation(item): number {
    let a = this.currentCalibration.a;
    let b = this.currentCalibration.b;
    let A = item.get('z').value;
    let C = Math.round(((A - b) / a) * 10000) / 10000
    return C;
  }

  get isDisabled() {
    if ((<FormArray>this.dataForm.get('data')).controls.length < 3) {
      return true
    }
    return !this.dataForm.valid || !this.currentCalibration;
  }

}
