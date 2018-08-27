import { Component, OnInit } from '@angular/core';
import { DialogService } from './../datapoints/dialog.service';
import { TreatmentFormComponent } from './../treatments/treatment-form/treatment-form.component';
import { DataFormComponent } from './../datapoints/data-form/data-form.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private dialogService: DialogService) { }

  ngOnInit() {
  }

  openDataDialog() {
    this.dialogService.openDialog(DataFormComponent);
  }

  openTreatmentDialog() {
    this.dialogService.openDialog(TreatmentFormComponent);
  }

}
