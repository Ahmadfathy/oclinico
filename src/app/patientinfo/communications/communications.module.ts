import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommunicationsComponent } from './communications.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Appointments Information',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: CommunicationsComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes)],
  declarations: [CommunicationsComponent]
})
export class CommunicationModule { }
