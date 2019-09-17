import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { StockadjustmentComponent } from './stockadjustment.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Stock Adjustment',
      rtltitle: 'التعديل الأسهم'
    },
    component: StockadjustmentComponent
  }
];

@NgModule({
  imports: [FormsModule, ReactiveFormsModule,
    CommonModule, RouterModule.forChild(routes)],
  declarations: [StockadjustmentComponent]
})

export class StockadjustmentModule { }
