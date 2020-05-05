import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-calibration-modal',
  templateUrl: './calibration-modal.component.html',
  styleUrls: ['./calibration-modal.component.scss']
})
export class CalibrationModalComponent implements OnInit {
  @Input()dataForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}


  ngOnInit(): void {
    this.dataForm = this.formBuilder.group({
      data: this.formBuilder.array([this.createItem()])
    });
  }
  
  createItem() {
    return this.formBuilder.group({
      x: null,
      y: null
    });
  }

}
