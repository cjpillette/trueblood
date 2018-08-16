import { DataFormComponent } from './../datapoints/data-form/data-form.component';
import { Component, OnInit } from '@angular/core';
import { DialogService } from './../datapoints/dialog.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private dialogService: DialogService) { }

  ngOnInit() {
  }

  openDialog() {
    this.dialogService.openDialog(DataFormComponent);
  }

}
