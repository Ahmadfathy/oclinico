import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EditfamilydetailsComponent } from './editfamilydetails.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'Add Communication',
      // rtltitle: 'ذلك. لا تمانع'
    },
    component: EditfamilydetailsComponent
  }
];

@NgModule({
  imports: [FormsModule,ReactiveFormsModule,OwlDateTimeModule, OwlNativeDateTimeModule,
    
CommonModule, RouterModule.forChild(routes)],
  declarations: [EditfamilydetailsComponent]
})
export class  EditfamilydetailsModule { }
