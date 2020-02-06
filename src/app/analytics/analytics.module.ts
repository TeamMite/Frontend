import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';
import { Statement6Component } from './statement6/statement6.component';
import { HttpClientModule } from '@angular/common/http';

import {MatSelectModule,MatCardModule} from '@angular/material';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AnalyticsComponent, Statement6Component],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    HttpClientModule,
    MatSelectModule,
    MatCardModule,
    FormsModule
    
  ]
})
export class AnalyticsModule { }
