import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { OignonDataSource } from './oignon-datasource';

@Component({
  selector: 'app-oignon',
  templateUrl: './oignon.component.html',
  styleUrls: ['./oignon.component.css']
})
export class OignonComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: OignonDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new OignonDataSource(this.paginator, this.sort);
  }
}
