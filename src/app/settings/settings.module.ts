import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {SettingsComponent} from './settings.component'

// import { ReferaldiscountComponent } from './referaldiscount/referaldiscount.component';
import { HttpClientModule } from '@angular/common/http';
import { SettingsRoutes } from './Settings.routing';

import { ReactiveFormsModule } from '@angular/forms';


import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SettingsComponent,
  
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(SettingsRoutes)
  ],
})


export class SettingsModule { }




