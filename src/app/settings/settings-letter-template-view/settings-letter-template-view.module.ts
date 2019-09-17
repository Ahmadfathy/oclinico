import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SettingsLetterTemplateViewComponent } from './settings-letter-template-view.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

const routes: Routes = [
  {
    path: '',
    data: {
      //title: 'Invoices',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: SettingsLetterTemplateViewComponent
  }
];

@NgModule({
  imports: [FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
     CommonModule, RouterModule.forChild(routes)],
  declarations: [SettingsLetterTemplateViewComponent]
})

export class SettingsLetterTemplateViewModule { }
