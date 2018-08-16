import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { DataPointsService } from '../data-points.service';
import { Point } from '../data-points.model';
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
  editPoint: Point;

  constructor(
    private fb: FormBuilder,
    private dataPointsService: DataPointsService,
    private dialogRef: MatDialogRef<DataFormComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.editPoint = data || {
      checktype: '',
      value: null,
      date: null,
      upperLimit: null,
      lowerLimit: null,
      unit: ''
    };
  }

  ngOnInit() {
    this.pointForm = this.fb.group({
      checktype: [this.editPoint.checktype, Validators.required],
      value: [this.editPoint.value,
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      date: [this.editPoint.date,
        [Validators.required,
        ]], // TODO: implement date validator
      upperLimit: [this.editPoint.upperLimit, [Validators.required]],
      lowerLimit: [this.editPoint.lowerLimit, [Validators.required]],
      unit: [this.editPoint.unit, [Validators.required]]
    });

  }

  displayLimits(): void {
    this.pointForm.get('checktype').valueChanges.subscribe(val => {
      this.dataPointsService
        .readSinglePointOf(val)
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

  writePoint(point: Point) {
    this.dataPointsService.writePoint(point);
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
