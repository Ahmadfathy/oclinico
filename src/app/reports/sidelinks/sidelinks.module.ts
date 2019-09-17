import { NgModule } from '@angular/core';
import { SidelinksComponent } from './sidelinks.component';

import { RouterModule } from '@angular/router';
@NgModule({
    imports : [RouterModule],

    declarations: [SidelinksComponent],
 exports: [SidelinksComponent],
})

export class SidelinksModule{}