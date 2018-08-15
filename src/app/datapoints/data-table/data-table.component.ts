import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Point, PointId } from '../data-points.model';
import { DataPointsService } from '../data-points.service';
import { PointsDataSource } from './data-datasource';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit , AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: PointsDataSource;
  points: any;
  userId: string;
  displayedColumns = ['date', 'value', 'update', 'delete'];

  bloodChecks = [
    { name: 'HEM', checked: false },
    { name: 'HGLB', checked: false },
    { name: 'HTRC', checked: false },
    { name: 'VGM', checked: false },
    { name: 'TCMH', checked: false },
    { name: 'CCMH', checked: false },
    { name: 'Ferrite', checked: false },
    { name: 'Fer serique', checked: false }
  ];

  constructor(private dataPointsService: DataPointsService) { }

  ngOnInit() {
    this.dataSource = new PointsDataSource(this.dataPointsService, this.paginator, this.sort);
    // this.userId = localStorage.getItem('userUID');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deletePoint(pointId: PointId) {
    this.dataPointsService.deletePoint(pointId);
  }

  updatePoint(point: Point, pointId: PointId) {
    this.dataPointsService.editPoint(point, pointId);
  }

  updateTest(point) {
    console.log('update test', point);
  }

  deleteTest(point) {
    console.log('delete test', point);
  }

}
