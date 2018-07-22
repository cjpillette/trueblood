import { DataPointsService } from './../data-points.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-chart',
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.component.css']
})
export class DataChartComponent implements OnInit {
  lineChartData: Array<any>;
  lineChartLabels: Array<Date>;
  valuePoints: Array<number>;
  checkType: string;
  isDataAvailable = false;
  hemUpper = 6;
  hemLower = 4;

  lineChartOptions = {
    scales: {
      xAxes: [{
          type: 'time',
          distribution: 'linear'
      }]
  }
  };

  lineChartColors = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // pink
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,0,255,1)',
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: 'transparent',
      pointHoverBorderColor: 'transparent'
    },
    { // pink
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,0,255,1)',
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: 'transparent',
      pointHoverBorderColor: 'transparent'
    },
  ];
  lineChartLegend = false;
  lineChartType = 'line';

  constructor(private dataPointsService: DataPointsService) {
    this.dataPointsService.getPoints().subscribe(
      val => {
        this.valuePoints = val.map(a => a.value);
        const datePoints = val.map(a => a.date);
        const upperLimit = val.map(a => this.hemUpper);
        const lowerLimit = val.map(a => this.hemLower);
        const checktypePoints = val.map(a => a.checktype);
        this.checkType = Array.from(new Set(checktypePoints)).join(' ');
        this.lineChartData = [
          {data: this.valuePoints, label: this.checkType},
          {data: upperLimit, label: 'Upper'},
          {data: lowerLimit, label: 'Lower'}
        ];
        this.lineChartLabels = datePoints;
        this.isDataAvailable = true; // only now can you paint the chart
      }
    );
  }

  ngOnInit() {
  }

}
