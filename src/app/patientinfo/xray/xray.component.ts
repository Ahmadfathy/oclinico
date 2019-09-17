import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-xray',
  templateUrl: './xray.component.html',
  styleUrls: ['./xray.component.css']
})
export class XrayComponent implements OnInit {
  patientId: string;
  patient_name:any;
  // showLoader: boolean;
  constructor(private router:Router) { }

  ngOnInit() {
    this.patient_name = sessionStorage.patient_name;
    var url = document.URL
    var url1 = url.split('?')
    this.patientId = url1[1].split('=')[1]
    document.title="X-Ray Details"
  }
  viewpatient(){
    var Refrral = this.patientId
    //console.log(Refrral)
    this.router.navigate(['/viewpatient'],{ queryParams: { Refrral} });
  }
  lab(){
    var Refrral =this.patientId
    //console.log(Refrral)
    this.router.navigate(['/laboratory'],{ queryParams: { Refrral} });
  }
}
