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
  displayedColumns = ['date', 'value', 'update', 'delete'];
  collection = 'hem';

  constructor(private dataPointsService: DataPointsService, private dialogService: DialogService) { }

  ngOnInit() {
    this.dataSource = new PointsDataSource(this.dataPointsService, this.paginator, this.sort, this.collection);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deletePoint(point: Point) {
    // fix - reimplement delete
  }

  updatePoint(point: Point) {
    this.dialogService.openDialog(DataFormComponent, point);
    // check it rewrites ok in firestore
  }

}
