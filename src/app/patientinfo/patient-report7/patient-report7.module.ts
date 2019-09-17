import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PatientReport7Component } from './patient-report7.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'sickleave',
            rtltitle: 'نفقات'
        },
        component: PatientReport7Component
    }
];

@NgModule({
    imports: [FormsModule, CommonModule, ReactiveFormsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        RouterModule.forChild(routes)],
    declarations: [PatientReport7Component
    ]
})

export class Patientreport7Module { }
