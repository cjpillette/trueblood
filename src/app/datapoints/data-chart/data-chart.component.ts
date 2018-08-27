import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FirestoreBloodService } from '../firestore-blood.service';
import * as Chart from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'app-data-chart',
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.component.css']
})
export class DataChartComponent implements OnInit, AfterViewInit {
  @Input() collection: string;
  valuePoints: Array<number>;
  unit: string;



  constructor(private bloodService: FirestoreBloodService) {
  }

  ngOnInit() {
    }

  ngAfterViewInit() {
    const canvas: any = document.getElementById('myChart');
    const ctx = canvas.getContext('2d');
    this.bloodService.readPointsOf(this.collection).subscribe(
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
                data: [100, 0, 100, 0, 0, 0, 0],
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
                label: 'Limite inferieure',
                data: lowerLimit,
                xAxisID: 'value-time',
                yAxisID: 'value-amount',
                borderColor: 'transparent',
                backgroundColor: 'rgba(55, 173, 221,  0.6)',
                pointBorderColor: 'transparent',
                borderWidth: 1,
                fill: false,
                pointRadius: 0
              },
              {
                type: 'line',
                label: 'Limite superieure',
                data: upperLimit,
                xAxisID: 'value-time',
                yAxisID: 'value-amount',
                borderColor: 'transparent',
                backgroundColor: 'rgba(55, 173, 221,  0.6)',
                pointBorderColor: 'transparent',
                borderWidth: 1,
                fill: '-1',
                pointRadius: 0
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
        }
      });
    });
  }


}
