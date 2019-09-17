import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AddfamilydetailsComponent } from './addfamilydetails.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';



const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'Add Communication',
      // rtltitle: 'ذلك. لا تمانع'
    },
    component: AddfamilydetailsComponent
  }
];

@NgModule({
  imports: [FormsModule,ReactiveFormsModule,OwlDateTimeModule, OwlNativeDateTimeModule,
    
CommonModule, RouterModule.forChild(routes)],
  declarations: [AddfamilydetailsComponent]
})
export class AddfamilydetailsModule { }
