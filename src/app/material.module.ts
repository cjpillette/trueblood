import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatButtonModule, MatCardModule, MatRadioModule, MatDatepickerModule, MAT_DATE_LOCALE } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatDatepickerModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatDatepickerModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}]
})
export class MaterialModule {
}
