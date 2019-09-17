import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AddletterComponent } from './addletter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
//import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import {SidelinksModule } from '../sidelinks/sidelinks.module'
//SidelinksModule

const routes: Routes = [
  {
    path: '',
    data: {
      //title: 'Invoices',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: AddletterComponent
  }
];

@NgModule({
  imports: [ CommonModule,
    SidelinksModule,FormsModule, ReactiveFormsModule ,CKEditorModule,
     RouterModule.forChild(routes)],
  declarations: [AddletterComponent]
})

export class AddletterModule { }
