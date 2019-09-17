import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dischargedetailes',
  templateUrl: './dischargedetailes.component.html',
  styleUrls: ['./dischargedetailes.component.css']
})
export class DischargedetailesComponent implements OnInit {
  patientId: string;
  patient_name:any;

  constructor(private router:Router) { }

  ngOnInit() {
    this.patient_name = sessionStorage.patient_name;
    var url = document.URL
    var url1 = url.split('?')
    this.patientId = url1[1].split('=')[1]
    document.title="Discharge Detailes"
  }

  viewpatient(){
    var Refrral = this.patientId
    //console.log(Refrral)
    this.router.navigate(['/viewpatient'],{ queryParams: { Refrral} });
  }
  lab(){
    var Refrral = this.patientId
    //console.log(Refrral)
    this.router.navigate(['/laboratory'],{ queryParams: { Refrral} });
  }

}
