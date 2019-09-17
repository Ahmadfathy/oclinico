import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PatientFollowupComponent } from './patient-followup.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'FollowUp',
            rtltitle: 'إشعار مراجعة'
        },
        component: PatientFollowupComponent
    }
];

@NgModule({
    imports: [FormsModule, CommonModule, ReactiveFormsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        RouterModule.forChild(routes)],
    declarations: [PatientFollowupComponent
    ]
})

export class PatientfollowupModule { }
