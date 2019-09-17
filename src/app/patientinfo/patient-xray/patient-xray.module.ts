import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PatientXrayComponent } from './patient-xray.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'xray request',
            rtltitle: 'نفقات'
        },
        component: PatientXrayComponent
    }
];

@NgModule({
    imports: [FormsModule, CommonModule, ReactiveFormsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        RouterModule.forChild(routes)],
    declarations: [PatientXrayComponent
    ]
})

export class PatientxrayModule { }
