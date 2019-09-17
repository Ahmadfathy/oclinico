import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, RequiredValidator } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
// import { invalid } from '@angular/compiler/src/render3/view/util';
import { Headers, RequestOptions } from '@angular/http';
// import { json } from 'd3';
// import { anyKeysRemoved } from '@fullcalendar/core/util/object-similarity';
// import { copyStyles } from '@angular/animations/browser/src/util';
// import { formatRange } from '@fullcalendar/core';


@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})

export class StoresComponent implements OnInit {

  worktype = []
  StoresForm: FormGroup;
  submitted = false;
  arabicstroe = ['Store1', 'Store2', 'Store3', 'Store4'];
  englishstroes = ['Store1', 'Store1', 'Store1', 'Store1']
  validationType: any
  stroes = { 'mem': [{ 'arabic': 'stroe1', 'english': 'stroe1' }, { 'arabic': 'stroe2', 'english': 'stroe1' }, { 'arabic': 'stroe3', 'english': 'stroe1' }, { 'arabic': 'stroe4', 'english': 'stroe1' }], }
  table = [];
  id: any;
  result: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private meta: Meta) { }
  ngOnInit() {  
    this.StoresForm = this.formBuilder.group({
      ArabicName: ['', Validators.required],
      EnglishName: ['', Validators.required],
    });

    $('#update').hide();
    this.tablegrid();
  }
  get c() {
    return this.StoresForm.controls;
  }
  alertMsg(msg: any) {
    alert(msg);
  }
  onSubmit() {
    
    this.submitted = true;
    //   stop here if form is invalid
    if (this.StoresForm.invalid) {
      return;
    }

    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.StoresForm.value))
  }
  insertdata() {
    if (this.StoresForm.invalid) {
      return
    }

    let body = {
      'NameAr': this.StoresForm.value.ArabicName,
      'NameEn': this.StoresForm.value.EnglishName,
      'UserID': "1",
      'ManagerID': "1",
      'AssistantID': "1"
    }


    console.log(body)
    //let Url='http://iumcpharma.oclinico.com/api/Store/add-new-Store'

    let url = 'https://api.oclinico.com/PharmacyAPI/api/Store/add-new-Store'
    this.http.post<any>(url, body).subscribe(res => {


      if (res.Result = true) {
        alert('Sucessfully Insert')
        this.StoresForm.reset()
        this.tablegrid()
        //this.router.navigate(['/grid'])
      }
      else {
        console.log('error')
      }
    })

  }
  tablegrid() {
    let url = 'http://iumcpharma.oclinico.com/api/Store/get-all-Store/'
    let body = {}

    this.http.post<any>(url, body).subscribe(res => {
      console.log("test by satish");
      console.log(res)

      if (res.Result == true) {
        this.table = res.data
      }
    })
  }
  edit(id: any) { 
    let url = 'http://iumcpharma.oclinico.com/api/Store/get-Store-by-id/'
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(url + id, options).subscribe(
      (res) => {
      this.result = res;
        console.log(res);
        if (this.result.Result == true) {
          //this.tablegrid();
          this.StoresForm.patchValue(
            {
              ArabicName: this.result.data.NameAr,
              EnglishName: this.result.data.NameEn,
            }
          );
          this.id = this.result.data.ID;
          $('#update').show();
          $('#reg').hide();

        } else {
          console.log("Load Failed :" + this.result.message)
        }
      }
      , (err) => { console.log("Error: " + err); });
  }
  update() {
    let body = {
      'ID': this.id,
      'NameAr': this.StoresForm.value.ArabicName,
      'NameEn': this.StoresForm.value.EnglishName,
      'UserID': "1",
      'ManagerID': "1",
      'AssistantID': "1"
    }
    console.log(body);
    let url = "http://iumcpharma.oclinico.com/api/Store/update-Store"

    this.http.post(url, body).subscribe(
      (res) => {
        this.result = res;
        if (this.result.Result == true) {
          console.log("Success");
          this.tablegrid();
          this.StoresForm.patchValue(
            {
              ArabicName: "",
              EnglishName: "",
            });
          this.id = null;
          $('#update').hide();
          $('#reg').show();
          this.alertMsg("Updated Successfully");
         this.submitted=false;
        } else {
          console.log("Update Failed :" + this.result.message)
        }
      }
      , (err) => { console.log("Error: " + err); }
    );
  }

  // result : any;

  delete(id: any) {

    if (confirm('Are you sure delete')) {

      let url = 'http://iumcpharma.oclinico.com/api/Store/delete-Store/'
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      });

      let options = new RequestOptions({ headers: headers });
      this.http.post(url + id, options)
        .subscribe
        (
          (res) => {
            this.result = res;
            if (this.result.Result == true) {
              console.log("Success");
              this.tablegrid();
              this.alertMsg("Deleted Successfully");
            }
            else {
              console.log("Delete Failed :" + this.result.message)
            }
          }
          , (err) => { console.log("Error: " + err); }
        );
    }
  }

 

}




