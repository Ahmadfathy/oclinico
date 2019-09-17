import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PatientHormonalComponent } from './patient-hormonal.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'sickleave',
            rtltitle: 'نفقات'
        },
        component: PatientHormonalComponent
    }
];

@NgModule({
    imports: [FormsModule, CommonModule, ReactiveFormsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        RouterModule.forChild(routes)],
    declarations: [PatientHormonalComponent
    ]
})

export class PatienthormonalModule { }
