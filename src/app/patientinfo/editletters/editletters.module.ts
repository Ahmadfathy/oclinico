import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EditlettersComponent } from './editletters.component';
// import { SidelinksModule } from '../sidelinks/sidelinks.module';
import { SidelinksComponent } from '../sidelinks/sidelinks.component';
import {SidelinksModule } from '../sidelinks/sidelinks.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
const routes: Routes = [
  {
    path: '',
    data: {
      //title: 'Invoices',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: EditlettersComponent
  }
];

@NgModule({
  imports: [FormsModule,ReactiveFormsModule,CKEditorModule,
    SidelinksModule,
     CommonModule, RouterModule.forChild(routes)],
  declarations: [EditlettersComponent]
})

export class EditlettersModule { }
