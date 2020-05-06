import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Chart } from 'chart.js';
import { ProjectService } from 'src/app/_shared/services/project.service';
import { UserService } from 'src/app/_shared/services/user.service';

@Component({
  selector: 'app-experiment-chart',
  templateUrl: './experiment-chart.component.html',
  styleUrls: ['./experiment-chart.component.scss']
})
export class ExperimentChartComponent implements OnInit {

  @Input() dataForm: FormGroup;
  @Input() id: string = null;
  @Input() projectDate: string = null;
  @Input() project = null;
  @Input() experiment = null;
  @Input() edit: boolean = true;
  @Output() onSaveClicked = new EventEmitter();

  data = [];
  originData = [];
  myLineChart;
  r2 = null;
  func = null;
  a = null;
  b = null;
  constructor(private projectSvc: ProjectService, private userSvc: UserService) { }



  ngOnInit(): void {
    this.myLineChart = new Chart('canvas', {
      type: 'scatter',
      data: {
        datasets: [{
          label: '',
          data: this.data,
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

    if (!!this.experiment) {
      this.r2 = this.experiment.r;
      this.func = this.experiment.func;
      this.a = this.experiment.activity;
      this.checkDataset(this.dataForm.value.data);
    }
    
    this.dataForm.valueChanges.subscribe(form => {
      this.checkDataset(form.data);
    })
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

  removeElement(event) {
    if (!this.edit) {
      return;
    }
    var activePoint = this.myLineChart.getElementAtEvent(event);

    if (activePoint.length > 0) {

      var clickedElementindex = activePoint[0]._index;
      this.myLineChart.data.datasets[0].data.splice(clickedElementindex, 1);
      this.myLineChart.update()
    }
  }

  calculateActivity() {
    let data = this.myLineChart.data.datasets[0].data.map(item => {
      return [item.x, item.y]
    })
    this.projectSvc.calculateRegression(data).subscribe(e => {
      this.r2 = e.r2;
      this.func = e.string;
      this.a = e.equation[0];
      this.b = e.equation[1];
    })
  }

  save() {
    let experiment = {
      person: this.userSvc.user['user'].login,
      desc: this.projectSvc.experimentName,
      calibration: this.projectSvc.experimentCalibration,
      data: this.dataForm.value.data,
      func: this.func,
      r: this.r2,
      activity: this.a
    }
    this.projectSvc.postExperiment(this.id, experiment, this.projectDate)
      .subscribe(data => {
        this.projectSvc.setCurrentProject(data);
        this.onSaveClicked.emit('ok');
      });
  }
}
