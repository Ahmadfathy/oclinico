import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { AddpatientComponent } from './addpatient/addpatient.component';

//import { AddfamilydetailsComponent } from './addfamilydetails/addfamilydetails.component';
//import { EditfamilydetailsComponent } from './editfamilydetails/editfamilydetails.component';

import { PatientDetailsRoutes } from './patientinfo.routing';
import { PatientinfoComponent } from './patientinfo.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
// import { PatientReport8Component } from './patient-report8/patient-report8.component';
// import { PatientRequestforcheckupComponent } from './patient-requestforcheckup/patient-requestforcheckup.component';
// import { PatientSickleavereportComponent } from './patient-sickleavereport/patient-sickleavereport.component';
// import { PatientSpecialrequestfortretmentComponent } from './patient-specialrequestfortretment/patient-specialrequestfortretment.component';
// import { PatientStoolanalysisComponent } from './patient-stoolanalysis/patient-stoolanalysis.component';
// import { PatientTransferreportComponent } from './patient-transferreport/patient-transferreport.component';
// import { PatientXrayComponent } from './patient-xray/patient-xray.component';
// import { PatientReport7Component } from './patient-report7/patient-report7.component';
// import { PatientHormonalComponent } from './patient-hormonal/patient-hormonal.component';
// import { PatientHematologyComponent } from './patient-hematology/patient-hematology.component';
// import { PatientFollowupComponent } from './patient-followup/patient-followup.component';
// import { PatientBiochemistryComponent } from './patient-biochemistry/patient-biochemistry.component';
// import { PatientUrinalreportComponent } from './patient-urinalreport/patient-urinalreport.component';


@NgModule({
  declarations: [
   // AddpatientComponent,
   // AddfamilydetailsComponent,
   // EditfamilydetailsComponent,
    PatientinfoComponent,
  //  PatientReport8Component,
  //  PatientRequestforcheckupComponent,
  //  PatientSickleavereportComponent,
  //  PatientSpecialrequestfortretmentComponent,
  //  PatientStoolanalysisComponent,
  //  PatientTransferreportComponent,
  //  PatientXrayComponent,
  //  PatientReport7Component,
  //  PatientHormonalComponent,
  //  PatientHematologyComponent,
  //  PatientFollowupComponent,
  //  PatientBiochemistryComponent,
  //  PatientUrinalreportComponent,
    

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    RouterModule.forChild(PatientDetailsRoutes),
    NgMultiSelectDropDownModule.forRoot(),
    CKEditorModule
  ],
})
export class PatientinfoModule { }


