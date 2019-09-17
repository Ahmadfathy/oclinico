import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editwards',
  templateUrl: './editwards.component.html',
  styleUrls: ['./editwards.component.css']
})
export class EditwardsComponent implements OnInit {
  public floor:any=["Main","1st","2nd","3rd","4th"];
  public location:any=["ER","General Ward","ICU"];
  public count:any=["1","2","3","4","5"];
  public department:any=["Internal Medicine","Ortho","Surgery","Day Surgery"];
  public roomno:any=["301","302","303","304","305"];


  constructor() { }

  ngOnInit() {
  }

}
