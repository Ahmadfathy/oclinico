import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PatientStoolanalysisComponent } from './patient-stoolanalysis.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'sickleave',
            rtltitle: 'نفقات'
        },
        component: PatientStoolanalysisComponent
    }
];

@NgModule({
    imports: [FormsModule, CommonModule, ReactiveFormsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        RouterModule.forChild(routes)],
    declarations: [PatientStoolanalysisComponent
    ]
})

export class PatientstoolanalysisModule { }
