import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-experiment-item',
  templateUrl: './experiment-item.component.html',
  styleUrls: ['./experiment-item.component.scss']
})
export class ExperimentItemComponent implements OnInit {
  @Input() experiment = null;
  constructor() { }

  ngOnInit(): void {
  }

}
