import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admissondetailes',
  templateUrl: './admissondetailes.component.html',
  styleUrls: ['./admissondetailes.component.css']
})
export class AdmissondetailesComponent implements OnInit {
  patientId: string;
  patient_name:any;
  constructor(private router:Router) { }

  ngOnInit() {
    this.patient_name = sessionStorage.patient_name;
    var url = document.URL
    var url1 = url.split('?')
    this.patientId = url1[1].split('=')[1];
    document.title="Admission Detailes"
  }
  viewpatient(){
    var Refrral =  this.patientId
    //console.log(Refrral)
    this.router.navigate(['/viewpatient'],{ queryParams: { Refrral} });
  }
  lab(){
    var Refrral =  this.patientId
    //console.log(Refrral)
    this.router.navigate(['/laboratory'],{ queryParams: { Refrral} });
  }
}
