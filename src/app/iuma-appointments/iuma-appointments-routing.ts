// import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { AllComponent } from './all/all.component';
import { AddComponent } from './add/add.component';
import { TodaysComponent } from './todays/todays.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { RequestComponent } from './request/request.component';
import { CalendarComponent } from './calendar/calendar.component';

export const iumaroutes: Routes = [
  {
    path:'',
    children:[
  //    { path:'',loadChildren: './all/all.module#AllModule' }
      // all
      // { path:'add',component:AddComponent },
      // { path:'todays',component:TodaysComponent },
      // { path:'upcoming',component:UpcomingComponent },
      // { path:'calendar',component:CalendarComponent },
      // { path:'request',component:RequestComponent },
    ]
  }
];

// @NgModule({
//   imports: [RouterModule.forChild(iumaroutes)],
//   exports: [RouterModule]
// })
// export class IumaAppointmentsRouting { }
