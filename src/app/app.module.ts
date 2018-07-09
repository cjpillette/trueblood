import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { DataFormComponent } from './datapoints/data-form/data-form.component';
import { DataTableComponent } from './datapoints/data-table/data-table.component';
import { DataPointsService } from './datapoints/data-points.service';
import { DataChartComponent } from './datapoints/data-chart/data-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    DataFormComponent,
    DataTableComponent,
    DataChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ChartsModule
  ],
  providers: [DataPointsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
