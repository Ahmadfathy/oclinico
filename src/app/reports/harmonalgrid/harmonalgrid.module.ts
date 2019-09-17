import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, } from '@angular/router';
import { HarmonalgridComponent } from './harmonalgrid.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';



const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Harmonal Assay',
            rtltitle: 'ذلك. لا تمانع'
        },
        component: HarmonalgridComponent
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
        HarmonalgridComponent,
    ],

    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})

export class harmonalgridModule { }
