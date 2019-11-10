import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, } from '@angular/router';
import { TestCategoriesComponent } from './testcategory.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { laborataryTestServices } from '../../laborataryTest.service';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Test Category',
      // rtltitle: 'ذلك. لا تمانع'
    },
    component: TestCategoriesComponent
  }
];



@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],

  declarations: [
    TestCategoriesComponent,


  ],
  providers: [
    laborataryTestServices
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})

export class TestCategoriesModule { }



