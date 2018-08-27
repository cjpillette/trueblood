import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Treatment } from '../treatment.model';
import { FirestoreTreatmentsService } from '../firestore-treatments.service';
import { TreatmentsDataSource } from './treatment-datasource';
import { DialogService } from '../../datapoints/dialog.service';
import { TreatmentFormComponent } from '../treatment-form/treatment-form.component';

@Component({
  selector: 'app-treatment-table',
  templateUrl: './treatment-table.component.html',
  styleUrls: ['./treatment-table.component.css']
})
export class TreatmentTableComponent implements OnInit , AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() collection: string;
  dataSource: TreatmentsDataSource;
  displayedColumns = ['startDate', 'endDate', 'title', 'description', 'update', 'delete'];
  treatment = 'treatment';

  constructor(private treatmentsService: FirestoreTreatmentsService, private dialogService: DialogService) {
  }

  ngOnInit() {
    this.dataSource = new TreatmentsDataSource(this.treatmentsService, this.paginator, this.sort);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteTreatment(treatment: Treatment) {
    this.treatmentsService.deleteTreatment(treatment.id);
  }

  updateTreatment(treatment: Treatment) {
    this.dialogService.openDialog(TreatmentFormComponent, treatment, this.treatment);
  }

}
