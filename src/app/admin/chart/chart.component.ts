import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  // Pie
  @Input() pieChartDatasets: any;
  @Input() pieChartLabels: any;
  constructor() {}

  public pieChartLegend = true;
  public pieChartPlugins = [];
}
