import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserinfoService } from 'src/app/userinfo.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  invoicedetails : any =[];
  dataTable: any =[];
  userid: string;
  nodata : boolean = true;
  isPageloaderVisible : boolean = false;
  website: any;
  phoneno: any;
  email: any;
  public showdata: boolean = true;
  public showLoader: boolean = true;
  public showpagenation: boolean = false;

  constructor(private chRef: ChangeDetectorRef,
              public cmn: UserinfoService,
              private router: Router,
              public http: Http,) { }

  ngOnInit() {
    this.userid =  window.localStorage.getItem("userId");
    this.GetGridData();
    this.showdata = true;
    this.nodata = false;
    this.showpagenation = true;
   
  }

  GetGridData(){
    console.log("GetInvoic grid data");
    this.isPageloaderVisible = true;
    var accessToken=  window.localStorage.Tokenval;
      console.log(accessToken);
      var serviceUrl = this.cmn.commonUrl+"Account/Invoice_transactions"
          var params  ={
                        "Sno":"",
                        "Clinicid":this.userid,       
                        "Branchid":"",      
                        "Invoiceno":"", 
                        "Issued_date":"", 
                        "PatientId":"",
                        "Doctorid":"",
                        "Appointment_info":"",
                        "Invoiceto":"",
                        "Extra_patient":"",
                        "Note":"",
                        "Tot_discount":"",       
                        "Sub_total":"",      
                        "Tax":"", 
                        "Invoice_tot":"", 
                        "Loginid": this.userid,
                        "Status":"",
                        "Item_code":"",
                        "bill_type":"",
                        "Qty":"",
                        "Price":"",
                        "Tot_Qty":"",
                        "TotPrice":"",
                        "Taxper":"",
                        "Tax_amt":"",
                        "Discount":"",
                        "Total":"",
                        "Trans_date":"",
                        "Last_Update":"",
                        "condition":"Invoices"
                        }
  
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken
      });
      let options = new RequestOptions({ headers: headers });
  
      this.http.post(serviceUrl, params, options).map(res => res.json()).subscribe(result => {
        console.log(result);
        console.log(params)
        this.isPageloaderVisible = false;
        if (result.status_cd == "0") {
          this.showLoader = false;
          this.showdata = false;
          this.nodata = true;
          this.showpagenation = false;
          $('#dataTable_wrapper').hide();
        }
        else {
          this.showLoader = false;
          this.invoicedetails = result.data.Table;
          console.log(JSON.stringify(this.invoicedetails));
          this.showdata = true;
          this.nodata = false;
          this.showpagenation = true;
          this.chRef.detectChanges();
          $('#dataTable_wrapper').show();
          const table1: any = $('#dataTable');
          this.dataTable = table1.DataTable();
        }
        // if(result.status_cd === "1"){
        //   this.invoicedetails = result.data.Table;
        //   console.log( this.invoicedetails);
        //   this.chRef.detectChanges();
        // const table: any = $('table');
        // this.dataTable = table.DataTable({
           
        //   destroy : true
        // });
        //   //  this.nodata;
        // }else{
        //   // alert("No Data Found");
            
        //     this.nodata = false;
        // }
      },
      );
      error =>{
        this.isPageloaderVisible = false;
        console.log(error);
        
      }
    
    }

    gotoaddinvoice(){
      // routerLink='/addinvoice'
      this.router.navigate(['/addinvoice',{frompage : "invoice"}]);
    }
  

      // --------------------------------print -----------------------------------------------

      // exportexcelall(table) {
      //   let uri = 'data:application/vnd.ms-excel;base64,'
      //     , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
      //     , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
      //     , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
      //   if (!table.nodeType) table = document.getElementById(table)
      //   var ctx = { worksheet: name || 'Invoice', table: table.innerHTML }
      //   window.location.href = uri + base64(format(template, ctx))
      // }

  print() {
    console.log("print.. ")
    var divToPrint = document.getElementById('DivIdToPrint');
    divToPrint.style.display = 'block';
    var s = divToPrint.innerHTML;
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write('<html><head></head><body onload="window.print()"> <link rel="stylesheet" href="assets/print.css"> ' + s + '</body></html>');
    newWin.document.close();
    setTimeout(function () { newWin.close(); divToPrint.style.display = 'none' }, 1000);
  }

  myFunction() {
    window.print();
  }

  // --------------------------------------print----------------------------------------------

}