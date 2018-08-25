import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { DataPointsService } from '../data-points.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-data-chart',
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.component.css']
})
export class DataChartComponent implements OnInit, AfterViewInit {
  @Input() collection: string;

  lineChartData: Array<any>;
  lineChartLabels: Array<Date>;
  valuePoints: Array<number>;
  checkType: string;
  isDataAvailable = false;
  unit: string;
  chart: any;
  ctx: any;
  canvas: any;

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
  }

  ngOnInit() {
    this.dataPointsService.readPointsOf(this.collection).subscribe(
      val => {
        this.valuePoints = val.map(a => a.value);
        const datePoints = val.map(a => a.date);
        const upperLimit = val.map(a => a.upperLimit);
        const lowerLimit = val.map(a => a.lowerLimit);
        const unitArray = val.map(a => a.unit);
        this.unit = Array.from(new Set(unitArray)).join(' ');

        this.lineChartData = [
          {data: this.valuePoints},
          {data: upperLimit},
          {data: lowerLimit}
        ];
        this.lineChartLabels = datePoints;
        this.isDataAvailable = true; // only now can you paint the chart
      });
    }

  ngAfterViewInit() {
    const canvas: any = document.getElementById('myChart');
    const ctx = canvas.getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['New', 'In Progress', 'On Hold'],
            datasets: [{
                label: '# of Votes',
                data: [1, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
          responsive: false,
        }
      });
    }


}
