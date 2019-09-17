import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EraddpatientComponent } from './eraddpatient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


const routes: Routes = [
  { path: '', component: EraddpatientComponent }];
@NgModule({
  declarations: [EraddpatientComponent],
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
export class EraddpatientModule { } 