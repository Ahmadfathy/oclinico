
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, } from '@angular/router';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { EmergencyComponent } from './emergency.component';
import { EmergencyServices } from './emergency.service';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'Add Communication',
      // rtltitle: 'ذلك. لا تمانع'
    },
    component: EmergencyComponent
  }
];



@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    RouterModule.forChild(routes),
    NgbModule
  ],

  declarations: [
    EmergencyComponent,


  ],
  providers: [
    EmergencyServices
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})

export class EmergencyModule { }



