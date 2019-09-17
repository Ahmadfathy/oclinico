import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AddattachmentsComponent } from './addattachments.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SidelinksModule } from '../sidelinks/sidelinks.module'


const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'Add Communication',
      // rtltitle: 'ذلك. لا تمانع'
    },
    component: AddattachmentsComponent
  }
];

@NgModule({
  imports: [FormsModule,ReactiveFormsModule,
    SidelinksModule,
CommonModule, RouterModule.forChild(routes)],
  declarations: [AddattachmentsComponent]
})
export class AddattachmentsModule { }
