// import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {
//   CommonModule,
//   LocationStrategy,
//   PathLocationStrategy,HashLocationStrategy
// } from '@angular/common';
import { CommonModule, PathLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';


import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import {UserinfoService} from 'src/app/userinfo.service';
import { DatePipe } from '@angular/common'; // priyanka
import { AuthGuard } from './shared/guard/auth.guard';

import {  SidelinksComponent } from './reports/sidelinks/sidelinks.component'
import {SidelinksModule } from './reports/sidelinks/sidelinks.module';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelSpeed: 1,    
  wheelPropagation:true,    
  minScrollbarLength: 20,
  maxScrollbarLength:100
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    BlankComponent,
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent
    ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CKEditorModule,
    HttpModule,
    ReactiveFormsModule,
   
    NgbModule.forRoot(),
    // FullCalendarModule,
    SlimLoadingBarModule.forRoot(),
    RouterModule.forRoot(Approutes, { useHash: true , scrollPositionRestoration: 'enabled' }),
    PerfectScrollbarModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBUb3jDWJQ28vDJhuQZxkC0NXr_zycm8D0' })

  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
    
      provide: LocationStrategy, 
      useClass: PathLocationStrategy
    },
    UserinfoService,
    DatePipe,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
