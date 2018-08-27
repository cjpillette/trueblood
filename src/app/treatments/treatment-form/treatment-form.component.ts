import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { FirestoreTreatmentsService } from '../firestore-treatments.service';
import { Treatment } from '../treatment.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-treatment-form',
  templateUrl: './treatment-form.component.html',
  styleUrls: ['./treatment-form.component.css']
})
export class TreatmentFormComponent implements OnInit {
  treatmentForm: FormGroup;
  editTreatment: Treatment;

  constructor(
    private fb: FormBuilder,
    private treatmentsService: FirestoreTreatmentsService,
    private dialogRef: MatDialogRef<TreatmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.editTreatment = data || {
      startDate: null,
      endDate: null,
      title: '',
      description: '',
    };
  }

  ngOnInit() {
    this.treatmentForm = this.fb.group({
      startDate: [this.editTreatment.startDate,
        [Validators.required,
        ]], // TODO: implement date validator
      endDate: [this.editTreatment.endDate,
        [Validators.required,
        ]], // TODO: implement date validator
      title: [this.editTreatment.title, [Validators.required]],
      description: [this.editTreatment.description, null],
    });

  }

  get startDate() {
    return this.treatmentForm.get('startDate');
  }

  get endDate() {
    return this.treatmentForm.get('endDate');
  }

  get title() {
    return this.treatmentForm.get('title');
  }

  get description() {
    return this.treatmentForm.get('description');
  }

  writePoint(treatment: Treatment) {
    this.treatmentsService.writeTreatment(treatment, this.editTreatment.id);
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
