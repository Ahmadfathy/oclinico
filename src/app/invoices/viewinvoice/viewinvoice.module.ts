import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ViewinvoiceComponent } from './viewinvoice.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'View Invoice',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: ViewinvoiceComponent
  }
];

@NgModule({
  imports: [FormsModule,ReactiveFormsModule, CommonModule, RouterModule.forChild(routes)],
  declarations: [ViewinvoiceComponent]
})
export class ViewinvoiceModule { }
