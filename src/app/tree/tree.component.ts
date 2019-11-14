import { Component, OnInit } from '@angular/core';
import { Employee, Service } from './tree.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  providers: [Service]
})
export class TreeComponent implements OnInit {

  employees: Employee[];
  lookupData: any;

  constructor(service: Service) {
    this.employees = service.getEmployees();
    this.lookupData = {
      store: {
        type: "array",
        data: this.employees,
        group: "City"
      }

    };
  }

  cellPrepared(e) {
    if (e.column.command === "edit") {
      let addLink = e.cellElement.querySelector(".dx-link-add");

      if (addLink) {
        addLink.remove();
      }
    }
  }

  editorPreparing(e) {
    if (e.dataField === "Head_ID" && e.row.data.ID === 1) {
      e.editorOptions.disabled = true;
      e.editorOptions.value = null;
    }
  }

  initNewRow(e) {
    e.data.Head_ID = 1;
  }

  ngOnInit() {
  }

}
