import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
  condition = true;

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
      upperLimit: new FormControl(),
      lowerLimit: new FormControl(),
      unit: new FormControl()
    });
    this.dataPointsService.modPoint.subscribe(
      data => {
        if (data) {
          this.pointForm.setValue({
            'checktype': data.point.checktype,
            'value': data.point.value,
            'date': data.point.date,
            'upperLimit': data.point.upperLimit,
            'lowerLimit': data.point.lowerLimit,
            'unit': data.point.unit
          });
          this.pointId = data.pointId;
        }
      }
    );
  }

  displayLimits(): void {
    this.pointForm.get('checktype').valueChanges.subscribe(val => {
      this.dataPointsService
        .getSinglePointOf(val.toLowerCase())
        .subscribe(point => {
          const pt = Object.assign({}, ...point);
          return this.pointForm.patchValue({
            'upperLimit': pt.upperLimit,
            'lowerLimit': pt.lowerLimit,
            'unit': pt.unit,
          });
      });
    });

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
  }

  editPoint(point: Point, pointId: PointId) {
    this.dataPointsService.updatePoint(point, pointId);
  }

  save() {
    this.dialogRef.close(this.pointForm.value);
  }

  close() {
    this.dialogRef.close();
  }
}
