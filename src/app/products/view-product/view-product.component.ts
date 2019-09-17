import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Http,Headers,RequestOptions,Response } from '@angular/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { UserinfoService } from '../../userinfo.service';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  nullValue: any; ItemCode = this.nullValue;
  Name = this.nullValue; SerialNumber = this.nullValue;Tax = this.nullValue;
  Supplier=this.nullValue; Price=this.nullValue; CostPrice=this.nullValue;
  StockLevel=this.nullValue; Notes=this.nullValue; Tax_Includes:any;
  Tax_value:any;Expire_date:any; IncludesTax:any;Status:any;ExpireDate :any;
  includetax: boolean;DivTax:any;
  products: any = [];
  dataTable : any;
  data:any=[];
  userid: string;
  public isPageloaderVisible = true;

  constructor(
    private meta: Meta,
    private MainTitle: Title,
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private chRef: ChangeDetectorRef,
    public commonService:UserinfoService,
    public http: Http,
    private route: ActivatedRoute
  ) { 
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }
ngOnInit() {
  this.userid =  window.localStorage.getItem("userId")
   var currentUrl = document.URL.split('?');
   currentUrl = currentUrl[currentUrl.length -1 ].split('=');
   this.ItemCode = currentUrl[currentUrl.length - 1]

  //this.commonService.tokenFun().subscribe(tokenResult =>{
   // var accessToken = tokenResult.token_type+" "+ tokenResult.access_token
   var accessToken = window.localStorage.Tokenval ;

   // let serviceUrl="http://graylogic.net/OclinicoAPI/Api/Account/Products_transactions";
   let serviceUrl= this.commonService.commonUrl+"Account/Products_transactions";
   let params = {
      "Sno":"",
      "Clinicid": this.userid,       
      "Branchid": this.userid,      
      "Category":"", 
      "Item_code":this.ItemCode, 
      "Name":"",
      "Serial_number":"",
      "Supplier":"",
      "Price":"",
      "Tax":"",
      "Cost_price":"",
      "Stock_level":"",     
      "Notes":"",     
      "Tax_includes":"", // UserID pass
      "Loginid":this.userid, 
      "Trans_date":"",
      "Last_updated":"",
      "var1":"",
      "var2":"",
      "condition":"getwithstockinfo"
      }
      
            let headers = new Headers({"Content-Type" : "application/json",
                                      Accept : "application/json",
                                      Authorization : accessToken});
                                  
            let options = new RequestOptions({ headers : headers });
            this.http.post(serviceUrl, params, options).map(res=>res.json()).subscribe(result =>{
            this.isPageloaderVisible = false;
              if(result.status_cd === "1"){
                 this.Supplier=result.data.Table[0].Supplier,
                  this.ItemCode=result.data.Table[0].Item_code,
                  this.Name=result.data.Table[0].Name,
                  this.SerialNumber=result.data.Table[0].Serial_number,
                  this.Price=result.data.Table[0].Price,
                  this.CostPrice=result.data.Table[0].Cost_price,
                  this.StockLevel=result.data.Table[0].Stock_level,
                  this.Notes=result.data.Table[0].Notes,
                  this.Tax=result.data.Table[0].Tax,
                  this.Status=result.data.Table[0].Status,
                  this.ExpireDate=result.data.Table[0].Expire_date
                  if(result.data.Table[0].Tax!="" || result.data.Table[0].Tax!=null || result.data.Table[0].Tax!=undefined){
                    this.DivTax=true;
                   }else{
                  this.DivTax=false;
                  }
                  this.products=result.data.Table1;
                  this.chRef.detectChanges();
                 const table: any = $('table');
                 this.dataTable = table.DataTable();
              }else{
                console.log(result.error_msg);
                console.log(accessToken);
                this.chRef.detectChanges();
                const table: any = $('table');
                 this.dataTable = table.DataTable();
              }
            },
            error=>{
              console.log(error);
            }
            );
    // },
    // err=>{
    //   this.isPageloaderVisible = false;
    // console.log("Token Error:"+err);
    // }
    // );
}

EditProduct(){
  this.router.navigateByUrl('/editproduct?ItemCode='+this.ItemCode+'');
}
AdjustStockLevel()
{
  this.router.navigateByUrl('/stockadjustment?ItemCode='+this.ItemCode+'');
}
}

