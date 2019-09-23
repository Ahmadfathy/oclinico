import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, } from '@angular/router';
import { XRayRequestComponent } from './xrayrequest.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { XrayServices } from '../xray.service';

const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'Add Communication',
      // rtltitle: 'ذلك. لا تمانع'
    },
    component: XRayRequestComponent
  }
];



@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],

  declarations: [
    XRayRequestComponent,
  ],
  providers: [
    XrayServices
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})

export class XRayRequestModule { }



