import { DataFormComponent } from './../datapoints/data-form/data-form.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      date: new Date()
    };

    const dialogRef = this.dialog.open(DataFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => console.log('i was closed and data is', data)
    );
}

}
