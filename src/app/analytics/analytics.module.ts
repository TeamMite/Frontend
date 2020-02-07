import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';
import { Statement6Component } from './statement6/statement6.component';
import { HttpClientModule } from '@angular/common/http';

import { Ng2GoogleChartsModule } from "ng2-google-charts";
import {MatSelectModule,MatCardModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';


@NgModule({
  declarations: [AnalyticsComponent, Statement6Component],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    HttpClientModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,
    Ng2GoogleChartsModule
  ]
})
export class AnalyticsModule { }
