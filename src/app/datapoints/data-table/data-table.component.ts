import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Point } from '../data-points.model';
import { DataPointsService } from '../data-points.service';
import { PointsDataSource } from './data-datasource';
import { DialogService } from './../dialog.service';
import { DataFormComponent } from './../data-form/data-form.component';

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

  constructor(private dataPointsService: DataPointsService, private dialogService: DialogService) { }

  ngOnInit() {
    this.dataSource = new PointsDataSource(this.dataPointsService, this.paginator, this.sort);
    // this.userId = localStorage.getItem('userUID');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deletePoint(point: Point) {
    // fix
    // this.dataPointsService.deletePoint(pointId);
  }

  updatePoint(point: Point) {
    this.dialogService.openDialog(DataFormComponent, point);
    // this.dataPointsService.editPoint(point, pointId);
  }

}
