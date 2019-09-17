import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PharmacyComponent } from './pharmacy.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PharmacyRoutes } from './pharmacy.routing';
// import { ViewpharmacydetailsComponent } from './viewpharmacydetails/viewpharmacydetails.component';
// import { AddmedicationComponent } from './addmedication/addmedication.component';

@NgModule({
  imports: [
        FormsModule, 
        ReactiveFormsModule,
        CommonModule,
         RouterModule.forChild(PharmacyRoutes)
        ],
  declarations: [
    PharmacyComponent,
  
  ]
})

export class PharmacyModule { }



// const routes: Routes = [
//   {
//     path: '',
//     data: {
//       title: 'Pharmacy',
//       rtltitle: 'مقابل'
//     },
//     component: PharmacyComponent
//   }
// ];

// @NgModule({
//   imports: [FormsModule, CommonModule, RouterModule.forChild(routes)],
//   declarations: [PharmacyComponent]
// })

// export class PharmacyModule { }
