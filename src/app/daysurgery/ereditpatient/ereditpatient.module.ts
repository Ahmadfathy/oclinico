import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EreditpatientComponent } from './ereditpatient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

const routes: Routes = [
  { path: '', component: EreditpatientComponent }];
@NgModule({
  declarations: [EreditpatientComponent],
  imports: [
    CommonModule,
    
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgMultiSelectDropDownModule.forRoot(),
    CKEditorModule,
    RouterModule.forChild(routes)
  ]
})
export class EreditpatientModule { } 