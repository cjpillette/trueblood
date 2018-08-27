import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { DataFormComponent } from './datapoints/data-form/data-form.component';
import { DataTableComponent } from './datapoints/data-table/data-table.component';
import { DataChartComponent } from './datapoints/data-chart/data-chart.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatNativeDateModule } from '@angular/material';
import { OignonComponent } from './oignon/oignon.component';
import { DataComboComponent } from './datapoints/data-combo/data-combo.component';
import { TreatmentTableComponent } from './treatments/treatment-table/treatment-table.component';
import { TreatmentFormComponent } from './treatments/treatment-form/treatment-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DataFormComponent,
    DataTableComponent,
    DataChartComponent,
    UserProfileComponent,
    UserProfileComponent,
    DashboardComponent,
    OignonComponent,
    DataComboComponent,
    TreatmentFormComponent,
    TreatmentTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    CoreModule,
    RouterModule.forRoot(
      [
        { path: '', component: UserProfileComponent},
        { path: 'dashboard', component: DashboardComponent}
      ])
  ],
  bootstrap: [AppComponent],
  entryComponents: [DataFormComponent, TreatmentFormComponent]
})
export class AppModule { }
