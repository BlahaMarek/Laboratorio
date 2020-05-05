import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { FormGroup } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-calibration-chart',
  templateUrl: './calibration-chart.component.html',
  styleUrls: ['./calibration-chart.component.scss']
})
export class CalibrationChartComponent implements OnInit {
  @Input() dataForm: FormGroup;
  data = []
  myLineChart;
  constructor() { }

  

  ngOnInit(): void {
    this.myLineChart = new Chart('canvas', {
      type: 'line',
      data: {
        datasets: [{
          label: 'My First dataset',
          data: this.data,
          pointBackgroundColor: 'white',
          pointRadius: 5,
          fill: false,
          showLine: false //<- set this
        }]
      },
      options: {
        animation: {duration: 0}
      }
    });
    
    this.dataForm.valueChanges.subscribe(form => {
      this.checkDataset(form.data.sort(function(a,b) {return a.x - b.x}));
    })
  }

  checkDataset(data) {
    let remove = true;
      this.removeData(this.myLineChart);
      data.forEach(element => {
        if (!!element.x && !!element.y) {
          this.addData(this.myLineChart, element.x, element.y);
        }
      });
  }

  addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets[0].data.push(data);
    chart.update();
  }
  
  removeData(chart) {
    chart.data.labels = []
    chart.data.datasets[0].data = []
    chart.update();
  }
}
