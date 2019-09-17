import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { ChartistModule } from 'ng-chartist';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CalendarModule, CalendarDateFormatter } from 'angular-calendar';
import { DashboardRoutes } from './dashboard.routing';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  InfocardComponent,
  ChatComponent,
  CommentComponent,
  TopsellComponent,
  SalesIncomeComponent
} from './dashboard-components';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    ChartsModule,
    ChartistModule,
    RouterModule.forChild(DashboardRoutes),
    PerfectScrollbarModule,
    CalendarModule.forRoot(),
    NgxChartsModule,
    NgxDatatableModule,
    ReactiveFormsModule
  ],
  declarations: [
    Dashboard1Component,
    InfocardComponent,
    ChatComponent,
    CommentComponent,
    TopsellComponent,
    SalesIncomeComponent
  ]
})
export class DashboardModule {}
