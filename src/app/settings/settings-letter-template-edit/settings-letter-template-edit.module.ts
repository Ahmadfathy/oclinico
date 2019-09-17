import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SettingsLetterTemplateEditComponent } from './settings-letter-template-edit.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


const routes: Routes = [
  {
    path: '',
    data: {
      //title: 'Invoices',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: SettingsLetterTemplateEditComponent
  }
];

@NgModule({
  imports: [FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
     CommonModule, RouterModule.forChild(routes)],
  declarations: [SettingsLetterTemplateEditComponent]
})

export class SettingsLetterTemplateEditModule { }
