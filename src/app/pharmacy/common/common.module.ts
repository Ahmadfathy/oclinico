import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonComponent } from './common.component';
// import { CommonComponent } from './Common.component';

const routes: Routes = [
    {
        path: '',
        component: CommonComponent
    }
];

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [CommonComponent]
})

export class commonModule { }