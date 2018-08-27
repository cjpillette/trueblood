import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Point } from '../data-points.model';
import { FirestoreBloodService } from '../firestore-blood.service';
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
  @Input() collection: string;
  dataSource: PointsDataSource;
  displayedColumns = ['date', 'value', 'update', 'delete'];
  blood = 'blood';

  constructor(private bloodService: FirestoreBloodService, private dialogService: DialogService) {
  }

  ngOnInit() {
    this.dataSource = new PointsDataSource(this.bloodService, this.paginator, this.sort, this.collection);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deletePoint(point: Point) {
    this.bloodService.deletePoint(point.checktype, point.id);
  }

  updatePoint(point: Point) {
    this.dialogService.openDialog(DataFormComponent, point, this.blood);
  }

}
