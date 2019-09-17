import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { UserinfoService } from 'src/app/userinfo.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  productdetailsForm:FormGroup;
  submitted= false;
  table=[];
  result : any ;
  id:any;
  prid: any;
  name: any;
  name1: any;
  name2: any;
  packagtypeid: any;
  Name: string;
  nameval:any;
  constructor(private formBuilder:FormBuilder,
    private http: Http,
    private meta: Meta,
    
    private cmn: UserinfoService,
    private router: Router)
    { 


      this.meta.addTag({ name: 'Description', content: 'Oclinico' });
      this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
    }

  ngOnInit() {
    // let url =document.URL;
    // this.Name=url.split('=')[1];

    var currentUrl = document.URL.split('?');
    currentUrl = currentUrl[currentUrl.length - 1].split('=');
    this.nameval = currentUrl[currentUrl.length - 1]
    console.log(this.nameval);


    this.tablegrid();
    
$('#update').hide();
    this.tablegrid();

    this.productdetailsForm=this.formBuilder.group({
      Registrationno:['',Validators.required],
      Strengthvalue:['',Validators.required],
      volume:['',Validators.required],
      packagesize:['',Validators.required],
      barcode:['',Validators.required],
      TradeNamear:['',Validators.required],
      ATCcode1:['',Validators.required],
      Unitofvolume:['',Validators.required],
      Publicprice:['',Validators.required],
      Alertquantity:['',Validators.required],
      TradeNameen:['',Validators.required],
      ATCcode2:['',Validators.required],
      Packagetype:['',Validators.required],
      remarks:['',Validators.required],


  });
  $('#update').hide();
  this.tablegrid();
  this.volume();
  this.unitofvolume();
  this.packagetype();
  }
  get s(){return this.productdetailsForm.controls;}

  alertMsg(msg:any)
  {
alert(msg);
  }

  onSubmit(){
    this.submitted= true;
    if (this.productdetailsForm.invalid){
      return;
    }
    console.log(this.productdetailsForm.value)
  }

  insertdata(){
  
    var accessToken = window.localStorage.Tokenval;
    
    let url = 'https://api.oclinico.com/PharmacyAPI/api/product-details/add-new-product';

    let body = 
    {
      'MasterID':"16",
      'RegistrationNo':this.productdetailsForm.value.Registrationno,
      'TradeNameAr':this.productdetailsForm.value.TradeNamear,
      'TradeNameEn':this.productdetailsForm.value.TradeNameen,
      'StrengthValue':this.productdetailsForm.value.Strengthvalue,
      'ATCCode1':this.productdetailsForm.value.ATCcode1,
      'ATCCode2':this.productdetailsForm.value.ATCcode2,
      'VolumeID':this.productdetailsForm.value.volume,
      'UnitofVolumeID':this.productdetailsForm.value.Unitofvolume,
      'PackageTypeID':this.productdetailsForm.value.Packagetype,
      'PackageSize':"4",
      'price':this.productdetailsForm.value.Publicprice,
      'BarCode':this.productdetailsForm.value.barcode,
      'Remarks':this.productdetailsForm.value.remarks,
      'AlerQty':this.productdetailsForm.value.Alertquantity, 
    }
     console.log(body)

    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      //Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
      console.log(res)
      
     
    
    console.log(res.Result);
      if (res.Result == true) {
        alert('Successfully Inserted')
        this.tablegrid();
        this.productdetailsForm.reset();
        console.log("successfully insert");
        this.submitted=false;
        
      } else {
        console.log("error")
      }
    })
    err => {
      console.log("Token Error:" + err);
    }
  }

  tablegrid() {
    
    // console.log("test");
        var accessToken = window.localStorage.Tokenval;
      
        let url = "https://api.oclinico.com/PharmacyAPI/api/product-details/get-all-product/"
       
        let body = {
          
        }
    
        let headers = new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: accessToken
        });
        let options = new RequestOptions({ headers: headers });
    
        this.http.post(url, body, options).map(res => res.json()).subscribe(res => {
          console.log(res)
      
        console.log(res.Result);
          if (res.Result == true) {
            console.log("success")
             ;    
                  this.table=res.data;
             console.log(this.table);
           
          } else {
            
          }
        })
        err => {
          console.log("Token Error:" + err);
        }
      }


    edit(id:any){

this.prid=id
    
      
      
      let url =  'https://api.oclinico.com/PharmacyAPI/api/product-details/get-product-by-id/';
      
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
       
      });
      let options = new RequestOptions({ headers: headers });
  
      this.http.post(url+this.prid,options).map(res => res.json()).subscribe(res => {
        console.log(res)
    
      
        if (res.Result == true) {
          //console.log("success")
             
               // this.table=res.data;
               $('#update').show();
            $('#save').hide();
          
          this.productdetailsForm.patchValue(
            {
              Registrationno:res.data.RegistrationNo,
              Strengthvalue:res.data.StrengthValue,
              volume:res.data.VolumeID,
              packagesize:res.data.PackageSize,
              barcode:res.data.BarCode,
              TradeNamear:res.data.TradeNameAr,
              ATCcode1:res.data.ATCCode1,
              Unitofvolume:res.data.UnitofVolumeID,
              Publicprice:res.data.price,
              Alertquantity:res.data.AlerQty,
              TradeNameen:res.data.TradeNameEn,
              ATCcode2:res.data.ATCCode2,
              Packagetype:res.data.PackageTypeID,
              remarks:res.data.Remarks,
            
            }
            );
            
            this.id=this.result.data.ID;
           
        
        }
        else{
          console.log("Load Failed:"+this.result.message)
        }
      }),
      (err) => {
        console.log("Token Error:" + err);
      
       }
    
      }


    update(){

      if (this.productdetailsForm,status=="Invalid"){
        return
      }
    
      let body={
      'ID':this.prid,
      'MasterID':"1",
      'RegistrationNo':this.productdetailsForm.value.Registrationno,
      'TradeNameAr':this.productdetailsForm.value.TradeNamear,
      'TradeNameEn':this.productdetailsForm.value.TradeNameen,
      'StrengthValue':this.productdetailsForm.value.Strengthvalue,
      'ATCCode1':this.productdetailsForm.value.ATCcode1,
      'ATCCode2':this.productdetailsForm.value.ATCcode2,
      'VolumeID':this.productdetailsForm.value.volume,
      'UnitofVolumeID':this.productdetailsForm.value.Unitofvolume,
      'PackageTypeID':this.productdetailsForm.value.Packagetype,
      'PackageSize':this.productdetailsForm.value.packagesize,
      'price':this.productdetailsForm.value.Publicprice,
      'BarCode':this.productdetailsForm.value.barcode,
      'Remarks':this.productdetailsForm.value.remarks,
      'AlerQty':this.productdetailsForm.value.Alertquantity,
    
      }
      console.log (body);
      
      let url="https://api.oclinico.com/PharmacyAPI/api/product-details/update-product"
      
      this.http.post(url,body).map(res => res.json()).subscribe(res => 
      { 
      this.result=res;
    
      if(this.result.Result==true)
      {
      console.log("Success");
      
      
      
      
      // this.productdetailsForm.patchValue(
      // {
      // MasterID:"",
      // RegistrationNo:"",
      // TradeNameAr:"",
      // TradeNameEn:"",
      // StrengthValue:"",
      // ATCCode1:"",
      // ATCCode2:"",
      // VolumeID:"",
      // UnitofVolumeID:"",
      // PackageTypeID:"",
      // PackageSize:"",
      // price:"",
      // BarCode:"", 
      // Remarks:"",
      // AlerQty:"",
      // ArabicName:"",
      // EnglishName:"",
      // });
      
     // this.id=null;
      
      this.alertMsg("Updated Successfully");
      this.submitted=false;
      this.productdetailsForm.reset();
      $('#update').hide();
      $('#save').show();
      this.tablegrid();
      }else
      {
        if(res.status_cd=="1")
      console.log("Update Failed :" + this.result.message)
      }
      }
      ,(err) => { console.log("Error: "+ err); }
      ); 
      }


      delete(id :any){
        var result = confirm(" Are you sure you want to delete");
        if (result == true) {
        
        
        let url='https://api.oclinico.com/PharmacyAPI/api/product-details/delete-product/'
        let headers = new Headers({
        "Content-Type":"application/json",
        Accept:"application/json", 
        });
        
        let options = new RequestOptions({headers:headers}); 
        

        this.http.post(url+id, options).map(res => res.json()).subscribe(res => {
          if(res.Result==true){
            alert('Successfully delete')
            
            this.tablegrid();

          }
          else{
            console.log('error delete')
          }
        })
      
      }

    }

      
volume(){
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/4"
    this.http.post(url, options).map(res => res.json()).subscribe(res => {
      if (res.Result == true) {
        this.name = res.data;
      }
    })
       
    }
    unitofvolume(){
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      });
      let options = new RequestOptions({ headers: headers });
      let url = "https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/5"
      this.http.post(url, options).map(res => res.json()).subscribe(res => {
        if (res.Result == true) {
          this.name1= res.data;
        }
      })
         
      }


      packagetype(){
        let headers = new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        });
        let options = new RequestOptions({ headers: headers });
        let url = "https://api.oclinico.com/PharmacyAPI/api/common/get-all-Common/6"
        this.http.post(url, options).map(res => res.json()).subscribe(res => {
          if (res.Result == true) {
            this.name2= res.data;
          }
        })
           
        }
}
