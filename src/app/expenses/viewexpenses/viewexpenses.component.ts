import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';
import { UserinfoService } from '../../userinfo.service';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-viewexpenses',
  templateUrl: './viewexpenses.component.html',
  styleUrls: ['./viewexpenses.component.css']
})
export class ViewexpensesComponent implements OnInit {

  expenseid: any;
  expenses: FormGroup;
  ExpenseDate: any;
  Vendor:any;
  Category:any;
  TotalExpense:any;
  Tax:any;
  TaxTotal:any;
  Notes:any;
  table: any;
  tableexpenses: boolean = false;
  public isPageloaderVisible = true;
  closeResult: string;

  constructor( private fb: FormBuilder,
    private commonService: UserinfoService,
    private http: Http, private router: Router,
    private route: ActivatedRoute,
    private cmn: UserinfoService,
    private modalService: NgbModal) { }

  ngOnInit() {

    var currentUrl = document.URL.split('?');
    currentUrl = currentUrl[currentUrl.length -1 ].split('=');
    this.expenseid = currentUrl[currentUrl.length - 1]
    if (this.expenseid) {
      this.get_expense_data(this.expenseid);
    }
    // this.route.paramMap.subscribe(params => {
    //   console.log(params.get('id'))
    //   this.expenseid = params.get('id');
    //   if (this.expenseid) {
    //     this.get_expense_data(this.expenseid);
    //   }
    //    });

  }

  get_expense_data(id) {
    console.log(id)
    var accessToken=  window.localStorage.Tokenval;
      console.log(accessToken);

      // our service calling as usual
      let url = this.commonService.commonUrl+'Account/Expense_Operations';

      let body = {
        "Clinicid": window.localStorage.getItem("userId"),
        "Branchid": "",
        "Expense_Id": id,
        "Expense_date": "",
        "Vendor": "",
        "Category": "",
        "Sub_total": "",
        "Tax": "",
        "Total_Expense_Amount": "",
        "Notes": "",
        "expense_products": "",
        "Status": "",
        "Loginid": "",
        "Trans_date": "",
        "Last_Updated": "",
        "Item_code": "",
        "Unitcost": "",
        "Qty": "",
        "Flag": "",
        "Condtion": "Get_Data"
      }
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });

      this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
        console.log(res)

        if (res.data.Table[0].result.toLowerCase() == 'true') {
          this.isPageloaderVisible = false;
          if (res.data.Table[0].ExpenseDate != "") {
            let r1 = res.data.Table[0].ExpenseDate.split("/")[0];
            let r2 = res.data.Table[0].ExpenseDate.split("/")[1];
            let r3 = res.data.Table[0].ExpenseDate.split("/")[2];
            this.ExpenseDate = r3 + "-" + r2 + "-" + r1;
          }
          this.ExpenseDate= this.ExpenseDate;
          this.Vendor=res.data.Table[0].Vendor;
          this.Category=res.data.Table[0].Category;
          this.TotalExpense=res.data.Table[0].Amount;
          this.Tax=res.data.Table[0].Tax;
          this.TaxTotal=res.data.Table[0].Sub_total;
          this.Notes=res.data.Table[0].Notes;
        
        }
        console.log(res.data.Table1.length)
        if (res.data.Table1.length !== 0) {
          if ((res.data.Table1[0].result.toLowerCase() == 'true')) {
            this.tableexpenses = true;
            this.table = res.data.Table1;
           
          } else {
            this.tableexpenses = false;
          }
        }


      })

      err => {
        this.isPageloaderVisible = false;
        console.log("Token Error:" + err);
      }
    
  }
  edit(id){
    this.router.navigate(['/editexpense',id])
  }
  delete(id,content2){
    console.log(id)
    var accessToken=  window.localStorage.Tokenval;
      console.log(accessToken);

      // our service calling as usual
      let url = this.commonService.commonUrl+'Account/Expense_Operations';

      let body = {
        "Clinicid":"",       
        "Branchid":"",      
        "Expense_Id":id, 
        "Expense_date":"", 
        "Vendor":"",
        "Category":"",
        "Sub_total":"",
        "Tax":"",
        "Total_Expense_Amount":"",
        "Notes":"",
        "expense_products":"",       
        "Status":"",      
        "Loginid":"", 
        "Trans_date":"", 
        "Last_Updated":"",
        "Item_code":"",
        "Unitcost":"",
        "Qty":"",
        "Flag":"",
        "Condtion":"Delete"
        }
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });

      this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
        console.log(res)

          if ((res.data.Table[0].result.toLowerCase() == 'true')) {
            this.modalService.open(content2); 
            this.router.navigate(['/expenses'])
          } else {
            
          }
      
      })

      err => {
        console.log("Token Error:" + err);
      }
    
  }

  open(content,value,content2) { 
    console.log(content)
    console.log(value)
    this.modalService.open(content).result.then((result) => {
      console.log(result)
      if(result == "Ok click"){
        console.log("ok")
        this.delete(value,content2);
      }
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    console.log(reason)
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    }else {
      return  `with: ${reason}`;
    }
  }

}
