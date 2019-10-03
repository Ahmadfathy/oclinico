import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { MyChartsComponent } from './my-charts/my-charts.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: 'newlogin', redirectTo: '/newlogin', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './newdashboard/newdashboard.module#newdashboardModule', canActivate: [AuthGuard] },
      // { path: 'dashboard', loadChildren: './dashboards/dashboard.module#DashboardModule' },
      { path: 'clinicinfo', loadChildren: './clinicinfo/clinicinfo.module#ClinicModule', canActivate: [AuthGuard] },
      { path: '', loadChildren: './iuma-appointments/iuma-appointments.module#IumaAppointmentsModule', canActivate: [AuthGuard] },
      { path: 'Communication', loadChildren: './communications/communications.module#MainCommunicationModule', canActivate: [AuthGuard] },
      { path: 'AddCommunication', loadChildren: './addcommunications/addcommunications.module#AddCommunicationModule', canActivate: [AuthGuard] },
      { path: 'Laboratary', loadChildren: './laboratary/laboratary.module#LaborataryModule', canActivate: [AuthGuard] },

      // -------------------- patientsummary ------------------------- //

      { path: 'patientsummery', loadChildren: './patient-summery/patient-summery.module#PatientSummeryModule', canActivate: [AuthGuard] },

      // -----------------wards--------------
      { path: 'wards', loadChildren: './wards/wards.module#WardsModule', canActivate: [AuthGuard] },
      { path: 'addwards', loadChildren: './addwards/addwards.module#AddwardsModule', canActivate: [AuthGuard] },
      { path: 'editwards', loadChildren: './editwards/editwards.module#EditwardsModule', canActivate: [AuthGuard] },


      { path: 'radiology', loadChildren: './radiology/radiology.module#radiologyModule', canActivate: [AuthGuard] },
      { path: 'viewradiology', loadChildren: './viewradiology/viewradiology.module#viewradiologyModule', canActivate: [AuthGuard] },
      { path: 'view-wards', loadChildren: './view-wards/view-wards.module#viewwardsModule', canActivate: [AuthGuard] },
      { path: 'viewLaboratary', loadChildren: './view-laboratory/view-laboratory.module#viewlaboratoryModule', canActivate: [AuthGuard] },

      // -------------------Invoices ------------------------
      { path: 'Maininvoice', loadChildren: './invoices/invoices.module#InvoicesModule', canActivate: [AuthGuard] },
      { path: 'addinvoice', loadChildren: './invoices/addinvoice/addinvoice.module#AddinvoiceModule', canActivate: [AuthGuard] },
      { path: 'viewinvoice', loadChildren: './invoices/viewinvoice/viewinvoice.module#ViewinvoiceModule', canActivate: [AuthGuard] },
      { path: 'buyinvoice', loadChildren: './invoices/buyinvoice/buyinvoice.module#BuyinvoiceModule', canActivate: [AuthGuard] },
      { path: 'sellinvoice', loadChildren: './invoices/sellinvoice/sellinvoice.module#SellinvoiceModule', canActivate: [AuthGuard] },
      { path: 'viewsellinvoice', loadChildren: './invoices/viewsellinvoice/viewsellinvoice.module#ViewSellinvoiceModule', canActivate: [AuthGuard] },
      { path: 'requestproduct', loadChildren: './invoices/requestproduct/requestproduct.module#RequestProductModule', canActivate: [AuthGuard] },
      { path: 'requestproductlist', loadChildren: './invoices/requestproductlist/requestproductlist.module#RequestProductListModule', canActivate: [AuthGuard] },
      { path: 'viewrequestproduct', loadChildren: './invoices/viewrequestproduct/viewrequestproduct.module#ViewRequestProductModule', canActivate: [AuthGuard] },
      { path: 'transferproduct', loadChildren: './invoices/transferproduct/transferproduct.module#TransferProductModule', canActivate: [AuthGuard] },
      { path: 'inventory', loadChildren: './invoices/inventory/inventory.module#InventoryModule', canActivate: [AuthGuard] },
      { path: 'charts', loadChildren: './my-charts/my-charts.module#MyChartsModule', canActivate: [AuthGuard] },
      // LAZY LOAD PENDING ..
      //   {   path:'Maininvoice',    

      //   loadChildren: () => import('./invoices/invoices.module').then(mod => mod.InvoicesModule)
      // },



      // ----------------------Products---------------------

      { path: 'product', loadChildren: './products/products.module#ProductsModule', canActivate: [AuthGuard] },
      {
        path: 'addproduct',
        loadChildren: './products/add-product/add-product.module#AddProductModule', canActivate: [AuthGuard]
      },
      {
        path: 'editproduct',
        loadChildren: './products/edit-product/edit-product.module#EditProductModule', canActivate: [AuthGuard]
      },
      {
        path: 'viewproduct',
        loadChildren: './products/view-product/view-product.module#ViewProductModule', canActivate: [AuthGuard]
      },
      {
        path: 'stockadjustment',
        loadChildren: './products/stockadjustment/stockadjustment.module#StockadjustmentModule', canActivate: [AuthGuard]
      },
      {
        path: 'advancesearch',
        loadChildren: './products/advancesearch/advancesearch.module#AdvancesearchModule', canActivate: [AuthGuard]
      },


      // ------------------Expnses-----------------
      { path: 'expenses', loadChildren: './expenses/expenses.module#ExpensesModule', canActivate: [AuthGuard] },

      {
        path: 'addexpense',
        loadChildren: './expenses/addexpense/addexpense.module#AddExpenseModule', canActivate: [AuthGuard]
      },

      {
        path: 'editexpense/:id',
        loadChildren: './expenses/addexpense/addexpense.module#AddExpenseModule', canActivate: [AuthGuard]
      },
      { path: 'viewexpenses', loadChildren: './expenses/viewexpenses/viewexpenses.module#ViewexpensesModule', canActivate: [AuthGuard] },

      // --------------------------Reports----------------

      { path: 'reports', loadChildren: './reports/reports.module#ReportsModule', canActivate: [AuthGuard] },
      {
        path: 'appointmentschedule',
        loadChildren: './reports/appointmentschedule/appointmentschedule.module#AppointmentscheduleModule', canActivate: [AuthGuard]
      },
      {
        path: 'upcomingbirthdays',
        loadChildren: './reports/upcomingbirthdays/upcomingbirthdays.module#UpcomingbirthdaysModule', canActivate: [AuthGuard]
      },
      {
        path: 'dailypayments',
        loadChildren: './reports/dailypayments/dailypayments.module#DailypaymentsModule', canActivate: [AuthGuard]
      },
      {
        path: 'paymentsummary',
        loadChildren: './reports/paymentsummary/paymentsummary.module#PaymentsummaryModule', canActivate: [AuthGuard]
      },
      {
        path: 'balance',
        loadChildren: './reports/balance/balance.module#BalanceModule', canActivate: [AuthGuard]
      },
      {
        path: 'cashreport',
        loadChildren: './reports/cashreport/cashreport.module#CashreportModule', canActivate: [AuthGuard]
      },
      {
        path: 'doctors',
        loadChildren: './reports/doctors/doctors.module#DoctorsModule', canActivate: [AuthGuard]
      },
      {
        path: 'expiryproducts',
        loadChildren: './reports/expiryproducts/expiryproducts.module#ExpiryproductsModule', canActivate: [AuthGuard]
      },
      {
        path: 'outstandinginvoices',
        loadChildren: './reports/outstandinginvoices/outstandinginvoices.module#OutstandinginvoicesModule', canActivate: [AuthGuard]
      },
      {
        path: 'patients',
        loadChildren: './reports/patients/patients.module#PatientsModule', canActivate: [AuthGuard]
      },
      {
        path: 'pricewiseproduct',
        loadChildren: './reports/pricewiseproduct/pricewiseproduct.module#PricewiseproductModule', canActivate: [AuthGuard]
      },
      {
        path: 'practicerevenue',
        loadChildren: './reports/practicerevenue/practicerevenue.module#PracticerevenueModule', canActivate: [AuthGuard]
      },
      {
        path: 'productwisereports',
        loadChildren: './reports/productwisereports/productwisereports.module#ProductwisereportsModule', canActivate: [AuthGuard]
      },
      {
        path: 'referralsources',
        loadChildren: './reports/referralsources/referralsources.module#ReferralsourcesModule', canActivate: [AuthGuard]
      },
      {
        path: 'rptexpenses',
        loadChildren: './reports/rptexpenses/rptexpenses.module#RptexpensesModule', canActivate: [AuthGuard]
      },
      {
        path: 'supplierwiseproducts',
        loadChildren: './reports/supplierwiseproducts/supplierwiseproducts.module#SupplierwiseproductsModule', canActivate: [AuthGuard]
      },
      {
        path: 'urinalreport',
        loadChildren: './reports/urinalreport/urinalreport.module#UrinalsModule', canActivate: [AuthGuard]
      },
      {
        path: 'x-ray-request',
        loadChildren: './reports/x-ray-request/x-ray-request.module#XrayrequestModule', canActivate: [AuthGuard]
      },
      {
        path: 'report8',
        loadChildren: './reports/reportprint/reportprint.module#ReportprintModule', canActivate: [AuthGuard]
      },
      {
        path: 'Reportsforcheckup',
        loadChildren: './reports/requestforcheckup/requestforcheckup.module#RequestforcheckupModule', canActivate: [AuthGuard]
      },
      {
        path: 'sickleave',
        loadChildren: './reports/sickleave/sickleave.module#SickleaveModule', canActivate: [AuthGuard]
      },
      {
        path: 'specialrequest',
        loadChildren: './reports/specialrequest/specialrequest.module#SpecialrequestModule', canActivate: [AuthGuard]
      },
      {
        path: 'transferreports',
        loadChildren: './reports/transferreports/transferreports.module#TransferreportsModule', canActivate: [AuthGuard]
      },
      {
        path: 'stoolanalysis',
        loadChildren: './reports/stoolanalysis/stoollanalysis.module#StoolanalysisModule', canActivate: [AuthGuard]
      },
      {
        path: 'report8ev',
        loadChildren: './reports/report8ev/report8ev.module#Report8evprintModule', canActivate: [AuthGuard]
      },
      // { path: 'hematology', loadChildren: './reports/hematology/hematology.module#HematologyModule', canActivate: [AuthGuard] },
      { path: 'report7', loadChildren: './reports/report7/report7.module#Report7Module', canActivate: [AuthGuard] },
      { path: 'report7grid', loadChildren: './reports/report7grid/report7grid.module#Report7GridModule', canActivate: [AuthGuard] },
      { path: 'report7view/:id/:text/:date', loadChildren: './reports/report7/report7.module#Report7Module', canActivate: [AuthGuard] },
      { path: 'report7update/:id/:text/:date', loadChildren: './reports/report7/report7.module#Report7Module', canActivate: [AuthGuard] },
      {
        path: 'harmonalassayrequest',
        loadChildren: './reports/hormonalassayrequest/hormonalassayrequest.module#hormonalassayrequestModule', canActivate: [AuthGuard]
      },
      {
        path: 'biochemistryrequest',
        loadChildren: './reports/biochemistryrequest/biochemistryrequest.module#BiochemistryrequestComponentModule', canActivate: [AuthGuard]
      },
      { path: 'biochemistryview/:id/:text/:date', loadChildren: './reports/biochemistryrequest/biochemistryrequest.module#BiochemistryrequestComponentModule', canActivate: [AuthGuard] },
      { path: 'biochemistryupdate/:id/:text/:date', loadChildren: './reports/biochemistryrequest/biochemistryrequest.module#BiochemistryrequestComponentModule', canActivate: [AuthGuard] },
      { path: 'hematologygrid', loadChildren: './reports/hematologygrid/hematologygrid.module#HematologygridModule', canActivate: [AuthGuard] },
      { path: 'hematology', loadChildren: './reports/hematology/hematology.module#HematologyModule', canActivate: [AuthGuard] },
      { path: 'hematologyview/:id/:text/:date', loadChildren: './reports/hematology/hematology.module#HematologyModule', canActivate: [AuthGuard] },
      { path: 'hematologyupdate/:id/:text/:date', loadChildren: './reports/hematology/hematology.module#HematologyModule', canActivate: [AuthGuard] },
      {
        path: 'viewurinalreport/:id/:text/:date',
        loadChildren: './reports/urinalreport-ev/urinalreport-ev.module#UrinalsEVModule', canActivate: [AuthGuard]
      },
      {
        path: 'editurinalreport/:id/:text/:date',
        loadChildren: './reports/urinalreport-ev/urinalreport-ev.module#UrinalsEVModule', canActivate: [AuthGuard]
      },
      {
        path: 'viewrequestreport/:id/:text/:tdate',
        loadChildren: './reports/requestcheckup/requestcheckup.module#RequestcheckupModule', canActivate: [AuthGuard]
      },
      {
        path: 'editrequestreport/:id/:text/:tdate',
        loadChildren: './reports/requestcheckup/requestcheckup.module#RequestcheckupModule', canActivate: [AuthGuard]
      },
      {
        path: 'harmonalgrid',
        loadChildren: './reports/harmonalgrid/harmonalgrid.module#harmonalgridModule', canActivate: [AuthGuard]
      },
      { path: 'harmonalview/:id/:text/:date', loadChildren: './reports/hormonalassayrequest/hormonalassayrequest.module#hormonalassayrequestModule', canActivate: [AuthGuard] },
      { path: 'harmonalupdate/:id/:text/:date', loadChildren: './reports/hormonalassayrequest/hormonalassayrequest.module#hormonalassayrequestModule', canActivate: [AuthGuard] },
      {
        path: 'biochemistrygrid',
        loadChildren: './reports/biochemistrygrid/biochemistrygrid.module#BiochemistrygridComponentModule', canActivate: [AuthGuard]
      },

      // { path: 'hematologygrid', loadChildren: './reports/hematologygrid/hematologygrid.module#HematologygridModule', canActivate: [AuthGuard] },
      // {
      //   path: 'hematologyview/:id/:text',
      //   loadChildren: './reports/hematology/hematology.module#HematologyModule', canActivate: [AuthGuard] 
      // },
      // {
      //   path: 'hematologyupdate/:id/:text',
      //   loadChildren: './reports/hematology/hematology.module#HematologyModule', canActivate: [AuthGuard] 
      // },
      {
        path: 'stoolanalysis',
        loadChildren: './reports/stoolanalysis/stoollanalysis.module#StoolanalysisModule', canActivate: [AuthGuard]
      },

      {
        path: 'viewsickleave',
        loadChildren: './reports/viewsickleave/viewsickleave.module#ViewsickleaveModule', canActivate: [AuthGuard]
      },
      {
        path: 'viewspecialrequest',
        loadChildren: './reports/viewspecialreq/viewspecialreq.module#ViewspecialreqModule', canActivate: [AuthGuard]
      },
      {
        path: 'viewstoolanalysis',
        loadChildren: './reports/viewstoolanalysis/viewstoolanalysis.module#ViewstoolanalysisModule', canActivate: [AuthGuard]
      },
      {
        path: 'followup',
        loadChildren: './reports/followup/followup.module#FollowupModule', canActivate: [AuthGuard]
      },
      {
        path: 'viewfollowup',
        loadChildren: './reports/viewfollowup/viewfollowup.module#viewFollowupModule', canActivate: [AuthGuard]
      },
      {
        path: 'viewxray',
        loadChildren: './reports/viewxray/viewxray.module#ViewxrayModule', canActivate: [AuthGuard]
      },
      {
        path: 'viewtransfer',
        loadChildren: './reports/viewtransfer/viewtransfer.module#ViewtransferModule', canActivate: [AuthGuard]
      },
      // ----------------------------GetpaymentModule--------------


      { path: 'getpayment', loadChildren: './payment/payment.module#GetpaymentModule', canActivate: [AuthGuard] },
      {
        path: 'edit-payments',
        loadChildren: './payment/edit-payments/edit-payments.module#EditPaymentsModule', canActivate: [AuthGuard]
      },
      {
        path: 'view-payments',
        loadChildren: './payment/view-payments/view-payments.module#ViewPaymentsModule', canActivate: [AuthGuard]
      },
      {
        path: 'AddPayment',
        loadChildren: './payment/addpayment/addpayment.module#AddpaymentModule', canActivate: [AuthGuard]
      },

      // --------------------------Settings----------------------
      { path: 'settings', loadChildren: './settings/settings.module#SettingsModule', canActivate: [AuthGuard] },

      {
        path: 'AddReferal',
        loadChildren: './settings/addreferal/addreferal.module#AddreferalModule', canActivate: [AuthGuard]
        // component: AddreferalComponent
      },
      {
        path: 'AddReferralDiscount',
        loadChildren: './settings/addrefdiscountsettings/addrefdiscountsettings.module#AddrefdiscountsettingsModule', canActivate: [AuthGuard]
        // component: AddrefdiscountsettingsComponent
      },
      {
        path: "ReferralMasterDetails",
        loadChildren: './settings/addreferalbind/addreferalbind.module#AddreferalbindModule', canActivate: [AuthGuard]
        // component : AddreferalbindComponent
      },
      {
        path: "Addtreatment",
        loadChildren: './settings/add-treatment/add-treatment.module#AddTreatmentModule', canActivate: [AuthGuard]
        //component : AddTreatmentComponent
      },
      {
        path: 'Addtax',
        loadChildren: './settings/add-taxes/add-taxes.module#AddTaxesModule', canActivate: [AuthGuard]
        // component : AddTaxesComponent
      },
      {
        path: 'AddSMSpackage',
        loadChildren: './settings/addsmspackages/addsmspackages.module#AddsmspackagesModule', canActivate: [AuthGuard]
        // component: AddsmspackagesComponent
      },
      {
        path: 'bankdetails',
        loadChildren: './settings/bankmasterdetails/bankmasterdetails.module#BankmasterdetailsModule', canActivate: [AuthGuard]
        // component: BankmasterdetailsComponent
      },
      {
        path: 'bankbranchdetails',
        loadChildren: './settings/bankbranchmasterdetails/bankbranchmasterdetails.module#BankbranchmasterdetailsModule', canActivate: [AuthGuard]
        //component: BankbranchmasterdetailsComponent
      },
      {
        path: 'addslotdetails',
        loadChildren: './settings/addslotdetails/addslotdetails.module#AddslotdetailsModule', canActivate: [AuthGuard]
        // component: AddslotdetailsComponent
      },
      {
        path: 'anotherbranch',
        loadChildren: './settings/anotherbranch/anotherbranch.module#AnotherbranchModule', canActivate: [AuthGuard]
        // component: AnotherbranchComponent
      },

      // ------------gouse-------
      {
        path: 'addbankmaster',
        // component: AddbankmasterComponent
        loadChildren: './settings/addbankmaster/addbankmaster.module#AddbankmasterModule', canActivate: [AuthGuard]
      },
      {
        path: 'addbankbranchmaster',
        loadChildren: './settings/addbankbranchmaster/addbankbranchmaster.module#AddbankbranchmasterModule', canActivate: [AuthGuard]
        // component: AddbankbranchmasterComponent//AddbankbranchmasterModule
      },
      {
        path: 'AddCashReceipt',
        // component: AddcashreceiptsettingsComponent
        loadChildren: './settings/addcashreceiptsettings/addcashreceiptsettings.module#AddcashreceiptsettingsModule', canActivate: [AuthGuard]
      },
      {
        path: 'addclinicinformation',
        // component: AddclinicinformationComponent
        loadChildren: './settings/addclinicinformation/addclinicinformation.module#AddclinicinformationModule', canActivate: [AuthGuard]
      },
      {
        path: 'AddDocumentType',
        //component: AdddocumenttypesettingsComponent
        loadChildren: './settings/adddocumenttypesettings/adddocumenttypesettings.module#AdddocumenttypesettingsModule', canActivate: [AuthGuard]
      },
      {
        path: 'AddFollowUps',
        //component: AddfollowupssettingsComponent
        loadChildren: './settings/addfollowupssettings/addfollowupssettings.module#AddfollowupssettingsModule', canActivate: [AuthGuard]
      },
      {
        path: 'AddInsuranCoverage',
        // component: AddinsucoversettingsComponent
        loadChildren: './settings/addinsucoversettings/addinsucoversettings.module#AddinsucoversettingsModule', canActivate: [AuthGuard]
      },
      {
        path: 'AddInsurance',
        //component: AddinsurancesettingsComponent
        loadChildren: './settings/addinsurancesettings/addinsurancesettings.module#AddinsurancesettingsModule', canActivate: [AuthGuard]
      },
      {
        path: 'AddOccupations',
        //component: AddoccupationssettingsComponent
        loadChildren: './settings/addoccupationssettings/addoccupationssettings.module#AddoccupationssettingsModule', canActivate: [AuthGuard]
      },
      {
        path: "Edit_doctor_treatment",
        // component: EditDoctTreatmentComponent
        loadChildren: "./settings/edit-doct-treatment/edit-doct-treatment.module#EditDoctTreatmentModule", canActivate: [AuthGuard]
      },
      {
        path: 'Edittax',
        //component : EditTaxesComponent
        loadChildren: "./settings/edit-taxes/edit-taxes.module#EditTaxesModule", canActivate: [AuthGuard]
      },
      {
        path: 'Edittreatment',
        loadChildren: "./settings/edit-treatment/edit-treatment.module#EditTreatmentModule", canActivate: [AuthGuard]
      },
      {
        path: 'editbankbranchmaster',
        //component: EditbankbranchmasterComponent
        loadChildren: "./settings/editbankbranchmaster/editbankbranchmaster.module#EditbankbranchmasterModule", canActivate: [AuthGuard]
      },

      {
        path: 'editbankmaster',
        // component: EditbankmasterComponent
        loadChildren: "./settings/editbankmaster/editbankmaster.module#EditbankmasterModule", canActivate: [AuthGuard]
      },
      {
        path: 'EditDocumentType',
        // component: EditdocumenttypesettingsComponent..
        loadChildren: "./settings/editdocumenttypesettings/editdocumenttypesettings.module#EditdocumenttypesettingsModule", canActivate: [AuthGuard]
      },
      {
        path: 'editbranch',
        // component: EditbranchComponent
        loadChildren: "./settings/editbranch/editbranch.module#EditbranchModule", canActivate: [AuthGuard]
      },
      {
        path: 'editgeneralsettings',
        //component: EditgeneralsettingsComponent
        loadChildren: "./settings/editgeneralsettings/editgeneralsettings.module#EditgeneralsettingsModule", canActivate: [AuthGuard]
      },
      {
        path: 'editInsuranCoverage',
        //component: EditinsucoversettingsComponent

        loadChildren: "./settings/editinsucoversettings/editinsucoversettings.module#EditinsucoversettingsModule", canActivate: [AuthGuard]
      },
      {
        path: 'EditInsurance',
        // component: EditinsurancesettingsComponent   
        loadChildren: "./settings/editinsucoversettings/editinsucoversettings.module#EditinsucoversettingsModule", canActivate: [AuthGuard]
      },
      {
        path: 'EditNumberSettings',
        //component: EditnumbersettingsComponent
        loadChildren: "./settings/editinsucoversettings/editinsucoversettings.module#EditinsucoversettingsModule", canActivate: [AuthGuard]
      },
      {
        path: 'EditOccupations',
        //component: EditoccupationssettingsComponent
        loadChildren: "./settings/editoccupationssettings/editoccupationssettings.module#EditoccupationssettingsModule", canActivate: [AuthGuard]
      },
      {
        path: 'EditReferralDiscount',
        //component: EditrefdiscountsettingsComponent
        loadChildren: "./settings/editrefdiscountsettings/editrefdiscountsettings.module#EditrefdiscountsettingsModule", canActivate: [AuthGuard]
      },
      {
        path: 'EditReferal',
        //component: EditreferralsettingsComponent
        loadChildren: "./settings/editreferralsettings/editreferralsettings.module#EditreferralsettingsModule", canActivate: [AuthGuard]
      },
      {
        path: 'editslotdetails',
        // component: EditslotdetailsComponent
        loadChildren: "./settings/editslotdetails/editslotdetails.module#EditslotdetailsModule", canActivate: [AuthGuard]
      },
      {
        path: "MachineDetails",
        loadChildren: "./settings/machine-details/machine-details.module#MachineDetailsModule", canActivate: [AuthGuard]
      },
      {
        path: "Add_MachineDetails",
        //component: MachineDetailsAddComponent
        loadChildren: "./settings/machine-details-add/machine-details-add.module#MachineDetailsAddModule", canActivate: [AuthGuard]
      },
      {
        path: "Edit_MachineDetails",
        // component: MachineDetailsEditComponent
        loadChildren: "./settings/machine-details-edit/machine-details-edit.module#MachineDetailsEditModule", canActivate: [AuthGuard]
      },
      {
        path: "Import_MachineDetails",
        /// component: MachineDetailsImportComponent
        loadChildren: "./settings/machine-details-import/machine-details-import.module#MachineDetailsImportModule", canActivate: [AuthGuard]
      },
      {
        path: 'AddClinicAddress',
        //component: MAddarabicadresssettingsComponent
        loadChildren: "./settings/m-addarabicadresssettings/m-addarabicadresssettings.module#MAddarabicadresssettingsModule", canActivate: [AuthGuard]
      },
      {
        path: 'addDepartments',
        // component: MAdddepartmentsettingsComponent
        loadChildren: "./settings/m-adddepartmentsettings/m-adddepartmentsettings.module#MAdddepartmentsettingsModule", canActivate: [AuthGuard]
      },
      {
        path: 'AddServiceMaster',
        //mponent: MAddservicemastersettingsComponent
        loadChildren: "./settings/m-addservicemastersettings/m-addservicemastersettings.module#MAddservicemastersettingsModule", canActivate: [AuthGuard]
      },
      {
        path: 'ClinicAddressDetails',
        // component: MArabicaddrdetailsComponent
        loadChildren: "./settings/m-arabicaddrdetails/m-arabicaddrdetails.module#MArabicaddrdetailsModule", canActivate: [AuthGuard]
      },
      {
        path: 'DepartmentsDetails',
        ///component: MDepartmemtdetailssettingsComponent
        loadChildren: "./settings/m-departmemtdetailssettings/m-departmemtdetailssettings.module#MDepartmemtdetailssettingsModule", canActivate: [AuthGuard]
      },
      {
        path: 'Specialization',
        //component:MDepartmentspecificationsComponent
        loadChildren: "./settings/m-departmentspecifications/m-departmentspecifications.module#MDepartmemtdetailssettingsModule", canActivate: [AuthGuard]
      },
      {
        path: 'AddSpecialization',
        //component:MDeptaddspecificationComponent
        loadChildren: "./settings/m-deptaddspecification/m-deptaddspecification.module#MDeptaddspecificationModule", canActivate: [AuthGuard]
      },

      //  --------------------santhoshi-----------------
      {
        path: 'MainTemplate',
        loadChildren: './settings/settings-letter-template/settings-letter-template.module#SettingsLetterTemplateModule', canActivate: [AuthGuard]
      },
      {
        path: 'EditTemplate',
        loadChildren: './settings/settings-letter-template-edit/settings-letter-template-edit.module#SettingsLetterTemplateEditModule', canActivate: [AuthGuard]
      },
      {
        path: 'ViewTemplate',
        loadChildren: './settings/settings-letter-template-view/settings-letter-template-view.module#SettingsLetterTemplateViewModule', canActivate: [AuthGuard]
      },
      {
        path: 'MainLaboratory',
        loadChildren: './settings/settings-laboratory-details/settings-laboratory-details.module#SettingsLaboratoryDetailsModule', canActivate: [AuthGuard]
      },
      {
        path: 'EditLaboratory',
        loadChildren: './settings/settings-laboratory-edit-details/settings-laboratory-edit-details.module#SettingsLaboratoryEditDetailsModule', canActivate: [AuthGuard]
      },
      {
        path: 'Taxes',
        loadChildren: './settings/taxes/taxes.module#TaxesModule', canActivate: [AuthGuard]
      },
      {
        path: "Treatment",
        loadChildren: './settings/treatment/treatment.module#TreatmentModule', canActivate: [AuthGuard]
      },
      {
        path: "Treat_MachineDetails",
        loadChildren: './settings/treatment-machine-details/treatment-machine-details.module#TreatmentMachineDetailsModule', canActivate: [AuthGuard]
      },
      {
        path: "Edit_Treat_MachineDetails",
        loadChildren: './settings/treatment-machine-details-edit/treatment-machine-details-edit.module#TreatmentMachineDetailsEditModule', canActivate: [AuthGuard]
      },
      {
        path: "Add_Treat_MachineDetails",
        loadChildren: './settings/treatment-machine-details-add/treatment-machine-details-add.module#TreatmentMachineDetailsAddModule', canActivate: [AuthGuard]
      },
      {
        path: 'AddReferralDiscount',
        // component: AddrefdiscountsettingsComponent
        loadChildren: "./settings/addrefdiscountsettings/addrefdiscountsettings.module#AddrefdiscountsettingsModule", canActivate: [AuthGuard]
      },
      {
        path: 'SMSpackages',
        loadChildren: './settings/smspackagesdetails/smspackagesdetails.module#SmspackagesdetailsModule', canActivate: [AuthGuard]
      },
      // {
      //   path: 'Communication',
      //   loadChildren: '../communications/communications.module#MainCommunicationModule'
      // },
      {
        path: 'addbankbranchmaster',
        loadChildren: './settings/addbankbranchmaster/addbankbranchmaster.module#AddbankbranchmasterModule', canActivate: [AuthGuard]
      },
      {
        path: 'slotdetails',
        loadChildren: './settings/slotdetails/slotdetails.module#SlotdetailsModule', canActivate: [AuthGuard]
      },
      {
        path: 'viewbranch',
        loadChildren: './settings/viewbranch/viewbranch.module#ViewbranchModule', canActivate: [AuthGuard]
      },

      {
        path: 'AddLaboratory',
        loadChildren: './settings/settings-laboratory-add-details/settings-laboratory-add-details.module#SettingsLaboratoryAddDetailsModule', canActivate: [AuthGuard]
      },

      {
        path: 'Referaldiscountdis',
        loadChildren: './settings/referaldiscount/referaldiscount.module#ReferaldiscountModule', canActivate: [AuthGuard]
      },
      {
        path: 'Referaldiscounts',
        loadChildren: './settings/refdisountdetailssettings/refdisountdetailssettings.module#RefdisountdetailssettingsModule', canActivate: [AuthGuard]
      },

      {
        path: 'Occupations',
        loadChildren: './settings/occupationsdetailssettings/occupationsdetailssettings.module#OccupationsdetailssettingsModule', canActivate: [AuthGuard]
      },
      {
        path: 'NumberSettings',
        loadChildren: './settings/numbersettingsdetails/numbersettingsdetails.module#NumbersettingsdetailsModule', canActivate: [AuthGuard]
      },

      {
        path: 'EditServiceMaster',
        loadChildren: './settings/m-servicedetailssettings/m-servicedetailssettings.module#MServicedetailssettingsModule', canActivate: [AuthGuard]
      },
      {
        path: 'ServiceMasterDetails',
        loadChildren: './settings/m-editservicemastersettings/m-editservicemastersettings.module#MEditservicemastersettingsModule', canActivate: [AuthGuard]
      },

      {
        path: 'editDepartments',
        loadChildren: './settings/m-editdepartmentsettings/m-editdepartmentsettings.module#MEditdepartmentsettingsModule', canActivate: [AuthGuard]
      },

      {
        path: 'EditClinicAddress',
        loadChildren: './settings/m-editarabicadresssettings/m-editarabicadresssettings.module#MEditarabicadresssettingsModule', canActivate: [AuthGuard]
      },

      {
        path: 'EditinsuranceType',
        loadChildren: './settings/insuranc-type-edit/insuranc-type-edit.module#InsurancTypeEditModule', canActivate: [AuthGuard]
      },

      {
        path: 'MainLaboratoryXray',
        loadChildren: './settings/laboratory-xray-details/laboratory-xray-details.module#LaboratoryXrayDetailsModule', canActivate: [AuthGuard]
      },
      {
        path: 'AddLaboratoryXray',
        loadChildren: './settings/laboratory-xray-add-details/laboratory-xray-add-details.module#LaboratoryXrayAddDetailsModule', canActivate: [AuthGuard]
      },
      {
        path: 'EditLaboratoryXray',
        loadChildren: './settings/laboratory-xray-edit-details/laboratory-xray-edit-details.module#LaboratoryXrayEditDetailsModule', canActivate: [AuthGuard]
      },


      {
        path: 'EditSpecialization',
        loadChildren: './settings/m-depteditspecification/m-depteditspecification.module#MDepteditspecificationModule', canActivate: [AuthGuard]
      },
      {
        path: 'FollowUps',
        loadChildren: './settings/followupssettings/followupssettings.module#FollowupssettingsModule', canActivate: [AuthGuard]
      },


      {
        path: 'InsuranceCategoryDetails',
        loadChildren: './settings/insurancecatsettingsbind/insurancecatsettingsbind.module#InsurancecatsettingsbindModule', canActivate: [AuthGuard]
      },

      {
        path: 'EditInsuranceCategory',
        loadChildren: './settings/insurancecatsettingsedit/insurancecatsettingsedit.module#InsurancecatsettingseditModule', canActivate: [AuthGuard]

      },

      {
        path: 'insuranceType',
        loadChildren: './settings/insuranc-type/insuranc-type.module#InsurancTypeModule', canActivate: [AuthGuard]
      },


      {
        path: 'AddinsuranceType',
        loadChildren: './settings/insuranc-type-add/insuranc-type-add.module#InsurancTypeAddModule', canActivate: [AuthGuard]
      },


      {
        path: 'AddFinanceDetail',
        loadChildren: './settings/fin-add-paymode-details/fin-add-paymode-details.module#FinAddPaymodeDetailsModule', canActivate: [AuthGuard]
      },

      {
        path: 'MainFinanceDetail',
        loadChildren: './settings/fin-pay-mode-details/fin-pay-mode-details.module#FinPayModeDetailsModule', canActivate: [AuthGuard]
      },
      {
        path: 'EditFinanceDetail',
        loadChildren: './settings/fin-edit-paymode-details/fin-edit-paymode-details.module#FinEditPaymodeDetailsModule', canActivate: [AuthGuard]
      },


      {
        path: 'DocumentType',
        loadChildren: './settings/doctypedetailssettings/doctypedetailssettings.module#DoctypedetailssettingsModule', canActivate: [AuthGuard]
      },

      {
        path: 'CashReceipts',
        loadChildren: './settings/cashreceiptsettings/cashreceiptsettings.module#CashreceiptsettingsModule', canActivate: [AuthGuard]
      },
      {
        path: 'clinicinformation',
        loadChildren: './settings/clinicinformation/clinicinformation.module#ClinicinformationModule', canActivate: [AuthGuard]
      },
      {
        path: 'Doctorfee',
        loadChildren: './settings/doctor-fee/doctor-fee.module#DoctorFeeModule', canActivate: [AuthGuard]
      },




      {
        path: 'Add_doctorfee',
        loadChildren: './settings/doctor-fee-add/doctor-fee-add.module#DoctorFeeAddModule', canActivate: [AuthGuard]
      },

      {
        path: "Edit_doctorfee",
        loadChildren: './settings/doctor-fee-edit/doctor-fee-edit.module#DoctorFeeEditModule', canActivate: [AuthGuard]
      },
      {
        path: "DoctorTreatment",
        loadChildren: './settings/doctor-treatment/doctor-treatment.module#DoctorTreatmentModule', canActivate: [AuthGuard]
      },

      {
        path: "Add_doctor_treatment",
        loadChildren: './settings/add-doct-treatment/add-doct-treatment.module#AddDoctTreatmentModule', canActivate: [AuthGuard]
      },
      {
        path: 'generalsettings',
        loadChildren: "./settings/generalsettings/generalsettings.module#GeneralsettingsModule", canActivate: [AuthGuard]
      },

      {
        path: 'AddInsuranceCategory',
        loadChildren: './settings/insurancecatsettingsadd/insurancecatsettingsadd.module#InsurancecatsettingsaddModule', canActivate: [AuthGuard]
      },

      {
        path: 'InsuranceDetails',
        loadChildren: './settings/insdetailsbindsettings/insdetailsbindsettings.module#InsdetailsbindsettingsModule', canActivate: [AuthGuard]
      },

      {
        path: 'InsuranCoverageDetails',
        loadChildren: './settings/insucoverdetailssettings/insucoverdetailssettings.module#InsucoverdetailssettingsModule', canActivate: [AuthGuard]
      },
      // --------------------------PharmacyComponent------------------


      {
        path: 'common',
        loadChildren: './pharmacy/common/common.module#commonModule', canActivate: [AuthGuard]
      },
      {
        path: 'commonunit/:name',
        loadChildren: './pharmacy/common/common.module#commonModule', canActivate: [AuthGuard]
      },
      {
        path: 'commondosageform/:name',
        loadChildren: './pharmacy/common/common.module#commonModule', canActivate: [AuthGuard]
      },
      {
        path: 'commonrouteadmin/:name',
        loadChildren: './pharmacy/common/common.module#commonModule', canActivate: [AuthGuard]
      },
      {
        path: 'commonvolume/:name',
        loadChildren: './pharmacy/common/common.module#commonModule', canActivate: [AuthGuard]
      },
      {
        path: 'commonunitvolume/:name',
        loadChildren: './pharmacy/common/common.module#commonModule', canActivate: [AuthGuard]
      },
      {
        path: 'commonpackagetype/:name',
        loadChildren: './pharmacy/common/common.module#commonModule', canActivate: [AuthGuard]
      },
      {
        path: 'commonstroagecondation/:name',
        loadChildren: './pharmacy/common/common.module#commonModule', canActivate: [AuthGuard]
      },
      {
        path: 'commoncountryManufature/:name',
        loadChildren: './pharmacy/common/common.module#commonModule', canActivate: [AuthGuard]
      },
      {
        path: 'commonMarketingcompany/:name',
        loadChildren: './pharmacy/common/common.module#commonModule', canActivate: [AuthGuard]
      },
      {
        path: 'commonNationality/:name',
        loadChildren: './pharmacy/common/common.module#commonModule', canActivate: [AuthGuard]
      },
      {
        path: 'commonAgentname/:name',
        loadChildren: './pharmacy/common/common.module#commonModule', canActivate: [AuthGuard]
      },
      {
        path: 'commonlegalstatus/:name',
        loadChildren: './pharmacy/common/common.module#commonModule', canActivate: [AuthGuard]
      },
      {
        path: 'manufature',
        loadChildren: './pharmacy/manufature/manufature.module#ManufatureModule', canActivate: [AuthGuard]
      },
      {
        path: 'Stores',
        loadChildren: './pharmacy/stores/stores.module#StoresModule', canActivate: [AuthGuard]
      },
      {
        path: 'products',
        loadChildren: './pharmacy/products/products.module#ProductsModule', canActivate: [AuthGuard]
      },


      {
        path: 'productdetails',
        loadChildren: './pharmacy/productdetails/productdetails.module#ProductdetailsModule', canActivate: [AuthGuard]
      },
      {
        path: 'productsgrid',
        loadChildren: './pharmacy/productsgrid/productsgrid.module#ProductsgridModule', canActivate: [AuthGuard]
      },
      {
        path: 'ViewPharmacy',
        loadChildren: './pharmacy/viewpharmacydetails/viewpharmacydetails.module#ViewpharmacydetailsModule', canActivate: [AuthGuard]
      },
      {
        path: 'Addmedication',
        loadChildren: './pharmacy/addmedication/addmedication.module#AddmedicationComponentModule', canActivate: [AuthGuard]
      },

      {
        path: 'xraygrid',
        loadChildren: './pharmacy/xraygrid/xraygrid.module#XraygridModule', canActivate: [AuthGuard]
      },
      {
        path: 'xray',
        loadChildren: './pharmacy/xray/xray.module#XRayModule', canActivate: [AuthGuard]
      },
      {
        path: 'xrayrequest',
        loadChildren: './pharmacy/xrayrequest/xrayrequest.module#XRayRequestModule', canActivate: [AuthGuard]
      },


      // ------------------------
      // {        path: '',  loadChildren: './usermanagement/usermanagement.module#UsermanagementModule'      },

      {
        path: 'jobtitle',
        loadChildren: './usermanagement/jobtitle/jobtitle.module#JobtitleModule', canActivate: [AuthGuard]
      },
      {
        path: 'usercreate',
        loadChildren: './usermanagement/usercreation/usercreation.module#UsercreationModule', canActivate: [AuthGuard]
      },
      {
        path: 'manageuser',
        loadChildren: './usermanagement/manageuser/manageuser.module#ManageuserModule', canActivate: [AuthGuard]
      },
      {
        path: 'loginactivity',
        loadChildren: './usermanagement/loginactivities/loginactivities.module#LoginactivitiesModule', canActivate: [AuthGuard]
      },
      {
        path: 'useradd',
        loadChildren: './usermanagement/useradd/useradd.module#UseraddModule', canActivate: [AuthGuard]
      },
      {
        path: 'useredit',
        loadChildren: './usermanagement/useredit/useredit.module#UsereditModule', canActivate: [AuthGuard]
      },
      {
        path: 'userview',
        loadChildren: './usermanagement/userview/userview.module#UserviewModule', canActivate: [AuthGuard]
      },
      {
        path: 'addjobtitle',
        loadChildren: './usermanagement/addjobtitle/addjobtitle.module#AddjobtitleModule', canActivate: [AuthGuard]
      },
      {
        path: 'editjobtitle',
        loadChildren: './usermanagement/editjobtitle/editjobtitle.module#EditjobtitleModule', canActivate: [AuthGuard]
      },
      {
        path: 'assignroom',
        loadChildren: './usermanagement/assignrooms/assignrooms.module#AssignroomsModule', canActivate: [AuthGuard]
      },

      // ---------------Patientinfo-----------------
      // { path: 'Patientinfo', loadChildren: './patientinfo/patientinfo/patientinfo.module#PatientinfoModule' },
      {
        path: 'addpatient',
        loadChildren: './patientinfo/addpatient/addpatient.module#AddpatientModule', canActivate: [AuthGuard]
      },


      {
        path: 'editpatient',
        loadChildren: './patientinfo/editpatient/editpatient.module#EditpatientModule', canActivate: [AuthGuard]
      },


      {
        path: 'viewpatient',
        loadChildren: './patientinfo/viewpatient/viewpatient.module#ViewpatientModule', canActivate: [AuthGuard]
      },


      {
        path: 'billing',
        loadChildren: './patientinfo/billing/billing.module#BillingModule', canActivate: [AuthGuard]
      },


      {
        path: 'treatmentnote',
        loadChildren: './patientinfo/treatmentnotes/treatmentnotes.module#TreatmentnotesModule', canActivate: [AuthGuard]
      },


      {
        path: 'addtreatment',
        loadChildren: './patientinfo/addtreatment/addtreatment.module#AddtreatmentModule', canActivate: [AuthGuard]
      },
      {
        path: 'edittretement',
        loadChildren: './patientinfo/edittretement/edittretement.module#EdittretementModule', canActivate: [AuthGuard]
      },

      {
        path: 'addprescription',
        loadChildren: './patientinfo/addprescription/addprescription.module#AddprescriptionModule', canActivate: [AuthGuard]
      },


      {
        path: 'addletter',
        loadChildren: './patientinfo/addletter/addletter.module#AddletterModule', canActivate: [AuthGuard]
      },



      {
        path: 'addvisitnote',
        loadChildren: './patientinfo/addvisitnote/addvisitnote.module#AddvisitnoteModule', canActivate: [AuthGuard]
      },



      {
        path: 'prescription',
        loadChildren: './patientinfo/prescription/prescription.module#PrescriptionModule', canActivate: [AuthGuard]
      },



      {
        path: 'autocomplate',
        loadChildren: './patientinfo/autocomplate/autocomplate.module#AutocomplateModule', canActivate: [AuthGuard]
      },


      {
        path: 'payments',

        loadChildren: './patientinfo/payments/payments.module#PaymentsModule', canActivate: [AuthGuard]
      },


      {
        path: 'invoices',
        loadChildren: './patientinfo/patient-details-invoices/patient-details-invoices.module#PatientDetailsInvoicesModule', canActivate: [AuthGuard]
      },



      {
        path: 'addatachments',
        loadChildren: './patientinfo/addattachments/addattachments.module#AddattachmentsModule', canActivate: [AuthGuard]
      },


      {
        path: 'appoinmentsgrid',
        loadChildren: './patientinfo/appoinmentsgrid/appoinmentsgrid.module#AppoinmentsgridModule', canActivate: [AuthGuard]
      },



      {
        path: 'laboratory',
        loadChildren: './patientinfo/laboratory/laboratory.module#LaboratoryModule', canActivate: [AuthGuard]
      },



      {
        path: 'visitnote',
        loadChildren: './patientinfo/visitnote/visitnote.module#VisitnoteModule', canActivate: [AuthGuard]
      },



      {
        path: 'letters',
        loadChildren: './patientinfo/letters/letters.module#LettersModule', canActivate: [AuthGuard]
      },


      {
        path: 'viewprescription',
        loadChildren: './patientinfo/viewprescription/viewprescription.module#ViewprescriptionModule', canActivate: [AuthGuard]
      },



      {
        path: 'attachements',
        loadChildren: './patientinfo/attachments/attachments.module#AttachmentsModule', canActivate: [AuthGuard]
      },


      {
        path: 'editattachments',
        loadChildren: './patientinfo/editattachments/editattachments.module#EditattachmentsModule', canActivate: [AuthGuard]
      },


      {
        path: 'viewattachments',
        loadChildren: './patientinfo/viewattachment/viewattachment.module#ViewattachmentModule', canActivate: [AuthGuard]
      },



      {
        path: 'editletters',
        loadChildren: './patientinfo/editletters/editletters.module#EditlettersModule', canActivate: [AuthGuard]
      },


      {
        path: 'viewletters',
        loadChildren: './patientinfo/viewletters/viewletters.module#ViewlettersModule', canActivate: [AuthGuard]
      },


      {
        path: 'editvisitnote',
        loadChildren: './patientinfo/editvisitnote/editvisitnote.module#EditvisitnoteModule', canActivate: [AuthGuard]
      },



      {
        path: 'viewvisitnote',
        loadChildren: './patientinfo/viewvisitnote/viewvisitnote.module#ViewvisitnoteModule', canActivate: [AuthGuard]
      },


      {
        path: 'xray',
        loadChildren: './patientinfo/xray/xray.module#XrayModule', canActivate: [AuthGuard]
      },


      {
        path: 'procedure',
        loadChildren: './patientinfo/procedure/procedure.module#ProcedureModule', canActivate: [AuthGuard]
      },

      {
        path: 'admission',
        loadChildren: './patientinfo/admissondetailes/admissondetailes.module#AdmissondetailesModule', canActivate: [AuthGuard]
      },


      {
        path: 'discharge',
        loadChildren: './patientinfo/dischargedetailes/dischargedetailes.module#DischargedetailesModule', canActivate: [AuthGuard]
      },


      {
        path: 'communications',
        loadChildren: './patientinfo/patient-details-communications/patient-details-communications.module#PatientDetailsCommunicationsModule', canActivate: [AuthGuard]
      },


      {
        path: 'Addfamilydetails',
        loadChildren: './patientinfo/addfamilydetails/addfamilydetails.module#AddfamilydetailsModule', canActivate: [AuthGuard]
      },
      {
        path: 'Editfamilydetails',
        loadChildren: './patientinfo/editfamilydetails/editfamilydetails.module#EditfamilydetailsModule', canActivate: [AuthGuard]
      },
      {
        path: 'patient-urinalreport',
        loadChildren: './patientinfo/patient-urinalreport/patient-urinalreport.module#PatientUrinalsModule', canActivate: [AuthGuard]
      },
      {
        path: 'patient-transferreport',
        loadChildren: './patientinfo/patient-transferreport/patient-transferreport.module#PatienttTransferreportsModule', canActivate: [AuthGuard]
      },
      {
        path: 'patient-specialrequestfortretment',
        loadChildren: './patientinfo/patient-specialrequestfortretment/patient-specialrequestfortretment.module#PatientSpecialrequestModule', canActivate: [AuthGuard]
      },
      {
        path: 'patient-sickleavereport',
        loadChildren: './patientinfo/patient-sickleavereport/patient-sickleavereport.module#PatientSickleaveModule', canActivate: [AuthGuard]
      },
      {
        path: 'patient-requestforcheckup',
        loadChildren: './patientinfo/patient-requestforcheckup/patient-requestforcheckup.module#PatientRequestforcheckupModule', canActivate: [AuthGuard]
      },
      {
        path: 'patient-report8',
        loadChildren: './patientinfo/patient-report8/patient-report8.module#PatientReportprintModule', canActivate: [AuthGuard]
      },
      {
        path: 'patient-xray',
        loadChildren: './patientinfo/patient-xray/patient-xray.module#PatientxrayModule', canActivate: [AuthGuard]
      },
      {
        path: 'patient-biochemistry',
        loadChildren: './patientinfo/patient-biochemistry/patient-biochemistry.module#PatientbiochemistryModule', canActivate: [AuthGuard]
      },
      {
        path: 'patient-stoolanalysis',
        loadChildren: './patientinfo/patient-stoolanalysis/patient-stoolanalysis.module#PatientstoolanalysisModule', canActivate: [AuthGuard]
      },
      {
        path: 'patient-followup',
        loadChildren: './patientinfo/patient-followup/patient-followup.module#PatientfollowupModule', canActivate: [AuthGuard]
      },
      {
        path: 'patient-hematology',
        loadChildren: './patientinfo/patient-hematology/patient-hematology.module#PatienthematologyModule', canActivate: [AuthGuard]
      },
      {
        path: 'patient-hormonal',
        loadChildren: './patientinfo/patient-hormonal/patient-hormonal.module#PatienthormonalModule', canActivate: [AuthGuard]
      },
      {
        path: 'patient-report7',
        loadChildren: './patientinfo/patient-report7/patient-report7.module#Patientreport7Module', canActivate: [AuthGuard]
      },

      // ---------------------

      // {        path: '',  loadChildren: './er/er.module#ErModule'},

      { path: 'eraddpatient', loadChildren: './er/eraddpatient/eraddpatient.module#EraddpatientModule', canActivate: [AuthGuard] },
      { path: 'ereditpatient', loadChildren: './er/ereditpatient/ereditpatient.module#EreditpatientModule', canActivate: [AuthGuard] },
      { path: 'erpatientinfo', loadChildren: './er/erpatientinfo/erpatientinfo.module#ErpatientinfoModule', canActivate: [AuthGuard] },
      { path: 'erviewpatient', loadChildren: './er/erviewpatient/erviewpatient.module#ErviewpatientModule', canActivate: [AuthGuard] },



      // ----------------------day surgery---------------
      // {        path: '',  loadChildren: './daysurgery/daysurgery.module#DaysurgeryModule'},
      { path: 'dayaddpatient', loadChildren: './daysurgery/eraddpatient/eraddpatient.module#EraddpatientModule', canActivate: [AuthGuard] },
      { path: 'dayeditpatient', loadChildren: './daysurgery/ereditpatient/ereditpatient.module#EreditpatientModule', canActivate: [AuthGuard] },
      { path: 'daypatientinfo', loadChildren: './daysurgery/erpatientinfo/erpatientinfo.module#ErpatientinfoModule', canActivate: [AuthGuard] },
      { path: 'dayviewpatient', loadChildren: './daysurgery/erviewpatient/erviewpatient.module#ErviewpatientModule', canActivate: [AuthGuard] },

      // --------------IUMC  Appointments-------------------
      { path: 'all', loadChildren: './iuma-appointments/all/all.module#AllModule', canActivate: [AuthGuard] },
      { path: 'add', loadChildren: './iuma-appointments/add/add.module#AddModule', canActivate: [AuthGuard] },
      { path: 'calendar', loadChildren: './iuma-appointments/calendar/calendar.module#CalendarModule', canActivate: [AuthGuard] },
      { path: 'request', loadChildren: './iuma-appointments/request/request.module#RequestModule', canActivate: [AuthGuard] },
      { path: 'todays', loadChildren: './iuma-appointments/todays/todays.module#TodaysModule', canActivate: [AuthGuard] },
      { path: 'upcoming', loadChildren: './iuma-appointments/upcoming/upcoming.module#UpcomingModule', canActivate: [AuthGuard] },
      //UpcomingModule
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: '',
        loadChildren:
          './authentication/authentication.module#AuthenticationModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/404'
  },
];