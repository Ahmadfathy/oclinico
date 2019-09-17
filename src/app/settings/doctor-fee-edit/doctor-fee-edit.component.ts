import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-fee-edit',
  templateUrl: './doctor-fee-edit.component.html',
  styleUrls: ['./doctor-fee-edit.component.css']
})
export class DoctorFeeEditComponent implements OnInit {

  val : any = "test";
  constructor() { }

  ngOnInit() {
    document.title="Edit doctorfee"

  }
  Submit(){
    
  }
}
