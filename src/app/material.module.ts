import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatRadioModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MAT_DATE_LOCALE,
  MatTableModule, MatPaginatorModule, MatSortModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}],
})
export class MaterialModule {
}
