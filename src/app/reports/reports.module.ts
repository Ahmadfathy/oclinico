import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ReportsRoutes } from './reports.routing';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Reports',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: ReportsComponent
  }
];


@NgModule({
  declarations: [
      ReportsComponent,
     
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(ReportsRoutes),
    NgMultiSelectDropDownModule.forRoot(),
    CKEditorModule
  ],
})

export class ReportsModule { }


// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Routes, RouterModule } from '@angular/router';
// import { ReportsComponent } from './reports.component';
// // import { ReportsRoutes } from './reports.routing';
// const routes: Routes = [
//   {
//     path: '',
//     data: {
//       title: 'Reports',
//       rtltitle: 'ذلك. لا تمانع'
//     },
//     component: ReportsComponent
//   }
// ];

// @NgModule({
//   imports: [FormsModule, CommonModule, RouterModule.forChild(routes)],
//   declarations: [ReportsComponent]
// })
// export class ReportsModule { }
