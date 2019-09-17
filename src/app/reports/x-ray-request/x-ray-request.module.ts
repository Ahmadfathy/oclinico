import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { XRayRequestComponent } from './x-ray-request.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Urinal Reports',
            rtltitle: 'الأطباء'
        },
        component: XRayRequestComponent
    }
];

@NgModule({
    imports: [FormsModule, CommonModule, ReactiveFormsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        RouterModule.forChild(routes)],
    declarations: [XRayRequestComponent
        //,SidelinksComponent
    ]
})

export class XrayrequestModule { }
