import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClinicinfoComponent } from './clinicinfo.component';
import {ReactiveFormsModule} from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Clinic Information',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: ClinicinfoComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule,NgbModule,ReactiveFormsModule,     OwlDateTimeModule, 
    OwlNativeDateTimeModule,RouterModule.forChild(routes)],
  declarations: [ClinicinfoComponent]
})
export class ClinicModule {}
