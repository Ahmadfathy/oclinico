import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SettingsLetterTemplateComponent } from './settings-letter-template.component';


const routes: Routes = [
  {
    path: '',
    data: {
      //title: 'Invoices',
      rtltitle: 'ذلك. لا تمانع'
    },
    component: SettingsLetterTemplateComponent
  }
];

@NgModule({
  imports: [FormsModule,
    ReactiveFormsModule,
     CommonModule, RouterModule.forChild(routes)],
  declarations: [SettingsLetterTemplateComponent]
})

export class SettingsLetterTemplateModule { }
