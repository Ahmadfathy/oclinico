
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, } from '@angular/router';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { EmergencyRoomsComponent } from './emergencyrooms.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { EmergencyRoomsServices } from './emergencyrooms.service';


const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'Add Communication',
      // rtltitle: 'ذلك. لا تمانع'
    },
    component: EmergencyRoomsComponent
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
    RouterModule.forChild(routes)
  ],

  declarations: [
    EmergencyRoomsComponent,


  ],
  providers: [
    EmergencyRoomsServices
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})

export class EmergencyRoomsModule { }



