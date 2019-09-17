import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PaymentsComponent } from './payments.component';
import { SidelinksModule } from '../sidelinks/sidelinks.module';

const routes: Routes = [
  {
    path: '',
    data: {
     // title: 'PaymentsComponent',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: PaymentsComponent
  }
];

@NgModule({
  imports: [FormsModule,
    SidelinksModule,
     CommonModule, RouterModule.forChild(routes)],
  declarations: [PaymentsComponent]
})
export class PaymentsModule { }
