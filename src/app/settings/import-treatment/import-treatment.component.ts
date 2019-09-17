import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import-treatment',
  templateUrl: './import-treatment.component.html',
  styleUrls: ['./import-treatment.component.css']
})
export class ImportTreatmentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  fileEvent(event){
    console.log("File event");
    let file = event.target.files[0];
    let fileName = file.name;
    
     alert(fileName);
  
  }

  Submit(){
    
  }
}
