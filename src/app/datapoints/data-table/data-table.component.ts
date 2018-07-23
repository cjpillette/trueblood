import { DataPointsService } from './../data-points.service';
import { Component, OnInit } from '@angular/core';
import { Point, PointId } from '../data-points.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  points: any;
  userId: string;

  constructor(private dataPointsService: DataPointsService) { }

  ngOnInit() {
    this.points = this.dataPointsService.getPoints();
    this.userId = localStorage.getItem('userUID');
  }

  deletePoint(pointId: PointId) {
    this.dataPointsService.deletePoint(pointId);
  }

  updatePoint(point: Point, pointId: PointId) {
    this.dataPointsService.editPoint(point, pointId);
  }

}
