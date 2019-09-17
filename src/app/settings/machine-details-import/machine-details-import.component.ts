import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-machine-details-import',
  templateUrl: './machine-details-import.component.html',
  styleUrls: ['./machine-details-import.component.css']
})
export class MachineDetailsImportComponent implements OnInit {

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
