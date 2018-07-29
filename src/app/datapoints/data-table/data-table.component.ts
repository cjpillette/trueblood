import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Point, PointId } from '../data-points.model';
import { DataPointsService } from './../data-points.service';
import { PointsDataSource } from './data-datasource';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: PointsDataSource;
  points: any;
  userId: string;
  displayedColumns = ['date', 'value'];

  constructor(private dataPointsService: DataPointsService) { }

  ngOnInit() {
    this.dataSource = new PointsDataSource(this.paginator, this.sort);
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
