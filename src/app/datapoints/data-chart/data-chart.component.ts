import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { DataPointsService } from '../data-points.service';
import * as Chart from 'chart.js';
import * as moment from 'moment';

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
    this.dataPointsService.readPointsOf(this.collection).subscribe(
      val => {
        this.valuePoints = val.map(a => a.value);
        const datePoints = val.map(a => a.date);
        const upperLimit = val.map(a => a.upperLimit);
        const lowerLimit = val.map(a => a.lowerLimit);
        const unitArray = val.map(a => a.unit);
        this.unit = Array.from(new Set(unitArray)).join(' ');

        const dates = [];
        datePoints.forEach( res => {
            dates.push(moment(res).locale('fr').format('YYYY-MM-DD'));
          });

        const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: dates,
            datasets: [
              {
                type: 'bar',
                label: 'Traitements',
                data: [100, 0,0,0,0,100,0,0,0,100,0,0,0,0,0,0,0,0,0,100,0,0,0,0],
                backgroundColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 0,
              },
              {
                type: 'line',
                label: this.collection,
                data: this.valuePoints,
                xAxisID: 'value-time',
                yAxisID: 'value-amount',
                backgroundColor: 'transparent',
                borderColor: 'rgba(75, 00, 150,1)',
                borderWidth: 2,
                pointRadius: 1,
              },
              {
                type: 'line',
                label: 'Upper Limit',
                data: upperLimit,
                xAxisID: 'value-time',
                yAxisID: 'value-amount',
                borderColor: [
                'rgba(255, 99, 132, 1)'
                ],
                backgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                borderWidth: 1
              },
              {
                type: 'line',
                label: 'Lower Limit',
                data: lowerLimit,
                xAxisID: 'value-time',
                yAxisID: 'value-amount',
                borderColor: [
                'rgba(255, 66, 66, 1)'
                ],
                backgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                borderWidth: 1
              }
          ]
          },
          options: {
            legend: {
              display: false
              },
            scales: {
              xAxes: [
                {
                  display: false,
                  barThickness: 2
                },
                {
                  id: 'value-time',
                  type: 'time',
                  distribution: 'linear',
                }
              ],
              yAxes: [
                {
                  display: false,
                  scaleLabel: {
                    display: true,
                    labelString: 'traitement'
                    }
                },
                {
                  id: 'value-amount',
                  display: true,
                  ticks: {
                    beginAtZero: false,
                                max: 7.5
                  }
                },
              ]
            },
            tooltips: {
              callbacks: {
                title: function(tooltipItem, data) {
                  const yyyymmdd = tooltipItem[0].xLabel;
                  const title = moment(yyyymmdd).locale('fr').format('MMM YYYY');
                  return title;
              }
            }
          }
        });
      });
    }


}
