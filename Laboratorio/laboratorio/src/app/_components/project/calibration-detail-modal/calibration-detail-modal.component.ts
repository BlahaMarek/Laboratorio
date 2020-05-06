import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalibrationModalComponent } from '../calibration-modal/calibration-modal.component';
import { Calibration } from 'src/app/_models/Calibration';
import { ProjectService } from 'src/app/_shared/services/project.service';
import { Chart } from 'chart.js';
import { UserService } from 'src/app/_shared/services/user.service';

@Component({
  selector: 'app-calibration-detail-modal',
  templateUrl: './calibration-detail-modal.component.html',
  styleUrls: ['./calibration-detail-modal.component.scss']
})
export class CalibrationDetailModalComponent implements OnInit {

  @Input()dataForm: FormGroup;
  currentCalibration: Calibration = null;
  calibrations: Calibration[];
  myLineChart;

  constructor(public userSvc: UserService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<CalibrationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private projectSvc: ProjectService) {}
    r2 = null;
    func = null;
    name = null;
    a = null;
    b = null;
    chartData = [];

  ngOnInit(): void {
    this.projectSvc.getCalibrations().subscribe(data => {
      this.calibrations = data;
    });

    this.dataForm = this.formBuilder.group({
      data: this.formBuilder.array([])
    });

    this.myLineChart = new Chart('canvas', {
      type: 'scatter',
      data: {
        datasets: [{
          label: '',
          data: this.chartData,
          pointBackgroundColor: 'white',
          pointRadius: 5,
          fill: false,
          showLine: false,
          order: 1
        },
        ]
      },
      options: {
        animation: { duration: 0 },
      }
    });
  }
  
  createItem(x, y) {
    return this.formBuilder.group({
      x: [{value: x, disabled: true}],
      y: [{value: y, disabled: true}],
    });
  }
  calibrationClicked(calibration) {
    this.dataForm = this.formBuilder.group({
      data: this.formBuilder.array([])
    });
    this.a = calibration.a;
    this.b = calibration.b;
    this.func = `y=${this.a}x + ${this.b}`;
    this.r2 = calibration.r;

    calibration.data.forEach(element => {
      this.getControls().push(this.createItem(element.x, element.y));
    });

    this.checkDataset(calibration.data);

  }
  getControls() {
    return (this.dataForm.get('data') as FormArray).controls;
  }
  sendClicked(e) {
    this.dialogRef.close();
  }
  onNoClick() {
    this.dialogRef.close();
  }


  checkDataset(data) {
    this.removeData(this.myLineChart);
    data.forEach(element => {
      if (!!element.x && !!element.y) {
        this.addData(this.myLineChart, element.x, element.y);
      }
    });
  }

  addData(chart, label, data) {
    chart.data.datasets[0].data.push({ x: label, y: data });
    chart.update();
  }

  removeData(chart) {
    chart.data.datasets[0].data = []
    chart.update();
  }

  delete() {
    this.projectSvc.deleteCalibration(this.currentCalibration._id).subscribe(data => {
      console.log(data);
      this.dialogRef.close();
    });
  }

}
