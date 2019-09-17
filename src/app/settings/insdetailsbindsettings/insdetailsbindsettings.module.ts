import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { InsdetailsbindsettingsComponent } from './insdetailsbindsettings.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    data: {
      // title: 'Add Communication',
      // rtltitle: 'ذلك. لا تمانع'
    },
    component: InsdetailsbindsettingsComponent
  }
];

@NgModule({
  imports: [FormsModule,ReactiveFormsModule,
  
CommonModule, RouterModule.forChild(routes)],
  declarations: [InsdetailsbindsettingsComponent]
})
export class InsdetailsbindsettingsModule { }
