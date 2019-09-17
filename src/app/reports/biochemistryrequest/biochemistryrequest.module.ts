import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, } from '@angular/router';
import { BiochemistryrequestComponent } from './biochemistryrequest.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';



const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Bio-Chemistry Report',
            rtltitle: 'ذلك. لا تمانع'
        },
        component: BiochemistryrequestComponent
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
        BiochemistryrequestComponent,
    ],


    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})

export class BiochemistryrequestComponentModule { }
