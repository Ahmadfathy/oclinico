import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidelinks',
  templateUrl: './sidelinks.component.html',
  styleUrls: ['./sidelinks.component.css']
})
export class SidelinksComponent implements OnInit {
  patientId: string;

  constructor() { }

  ngOnInit() {
    var url = document.URL
    var url1 = url.split('?')
    //this.patientId = url1[1].split('=')[1];
    this.patientId = sessionStorage.getItem("patientId");
    // alert(this.patientId);
    //sessionStorage.setItem("patientId"
  }
 
}

