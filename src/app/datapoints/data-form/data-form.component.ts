import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { DataPointsService } from '../data-points.service';
import { Point, PointId } from '../data-points.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {
  pointForm: FormGroup;
  pointId: string;
  bloodChecks = ['HEM', 'HGLB', 'HTRC', 'VGM', 'TCMH', 'CCMH', 'Ferrite', 'Fer serique'];

  constructor(
    private fb: FormBuilder,
    private dataPointsService: DataPointsService,
    private dialogRef: MatDialogRef<DataFormComponent>,
        @Inject(MAT_DIALOG_DATA) data
  ) {}

  ngOnInit() {
    this.pointForm = this.fb.group({
      checktype: ['', Validators.required],
      value: [null,
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      date: [null,
        [Validators.required,
        ]], // TODO: implement date validator
    });
    this.dataPointsService.modPoint.subscribe(
      data => {
        if (data) {
          this.pointForm.setValue({
            'checktype': data.point.checktype,
            'value': data.point.value,
            'date': data.point.date
          });
          this.pointId = data.pointId;
        }
      }
    );
  }

  get checktype() {
    return this.pointForm.get('checktype');
  }

  get value() {
    return this.pointForm.get('value');
  }

  get date() {
    return this.pointForm.get('date');
  }

  addPoint(point: Point) {
    this.dataPointsService.addPoint(point);
    this.clearForm();
  }

  editPoint(point: Point, pointId: PointId) {
    this.dataPointsService.updatePoint(point, pointId);
    this.clearForm();
  }

  clearForm() {
    this.pointForm.setValue({
      'checktype': null,
      'value': null,
      'date': null
    });
  }

  save() {
    this.dialogRef.close(this.pointForm.value);
  }

  close() {
      this.dialogRef.close();
  }

}
