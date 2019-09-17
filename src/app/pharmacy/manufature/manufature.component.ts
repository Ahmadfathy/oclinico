
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'app-manufature',
  templateUrl: './manufature.component.html',
  styleUrls: ['./manufature.component.css']
})
export class ManufatureComponent implements OnInit {
  worktype = []
  ManufatureForm: FormGroup;
  submitted = false;
  table = [];
  id: any;
  result: any;
  manufatureid: any;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private meta: Meta) { }

  ngOnInit() {
    this.ManufatureForm = this.formBuilder.group({
      Name: ['', Validators.required,],
      Phone: ['', Validators.required,],
      Address: ['', Validators.required,],

    });

    $('#update').hide();
    this.tablegrid();
  }

  get f() { return this.ManufatureForm.controls; }
  onSubmit() {
    this.submitted = true;
    //   stop here if form is invalid
    if (this.ManufatureForm.invalid) {
      return;
    }

    //  alertMsg(msg:any)
    //  {
    //    alert(msg);
    //  }



    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.StoresForm.value))
  }

  insertdata() {

    if (this.ManufatureForm.invalid) {
      return
    }

    let body = {
      'Name': this.ManufatureForm.value.Name,
      'Address': this.ManufatureForm.value.Address,
      'Phone': this.ManufatureForm.value.Phone,

    }


    console.log(body)

    let url = 'https://api.oclinico.com/PharmacyAPI/api/manufacturer/add-new-Manufacturer'


    this.http.post<any>(url, body).subscribe(res => {
      console.log(res)
      if (res.Result = true) {
        alert('Sucessfully Inserted')
        this.ManufatureForm.reset()
        this.submitted = false;
        //this.ManufatureForm.markAsPristine();

        this.tablegrid()
        //this.router.navigate(['/grid'])
      }
      else {
        console.log('error')
      }
    })

  }


  tablegrid() {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      //Authorization: accessToken
    });
    let options = new RequestOptions({ headers: headers });
    let url = 'https://api.oclinico.com/PharmacyAPI/api/manufacturer/get-all-Manufacturers/'


    this.http.post<any>(url, options).subscribe(res => {
      console.log("test by satish");
      console.log(res)

      if (res.Result == true) {
        this.table = res.data
      }
    })
  }



  edit(id) {
this.manufatureid=id
    let url = "https://api.oclinico.com/PharmacyAPI/api/manufacturer/get-Manufacturers-by-id/" +this.manufatureid;

    let headers = new Headers({

      "Content-Type": "application/json",
      Accept: "application/json",

    });

    let options = new RequestOptions({ headers: headers });

    this.http.post(url, options).subscribe(
      (res) => {

        this.result = res;
        console.log(res);
        if (this.result.Result == true) {


          this.ManufatureForm.patchValue(
            {
              Name: this.result.data.Name,
              Phone: this.result.data.Phone,
              Address: this.result.data.Address,
            }
          );
          this.id = this.result.data.ID;
          $('#update').show();
          $('#save').hide();

        } else {
          console.log("Load Failed :" + this.result.message)
        }
      }
      , (err) => { console.log("Error: " + err); });
  }

  update() {

    if (this.ManufatureForm.invalid) {
      return;
    }

    let url = "https://api.oclinico.com/PharmacyAPI/api/manufacturer/update-Manufacturer"
    let body = {
      'ID':this.manufatureid,
      'Name':this.ManufatureForm.value.Name,
      'Address': this.ManufatureForm.value.Address,
      'Phone': this.ManufatureForm.value.Phone,
    }
    console.log(body)

    this.http.post(url, body).subscribe(
      (res) => {
        this.result = res;
        if (this.result.Result == true) {
          console.log("Success");
          alert("Updated Successfully");
          this.tablegrid();
          this.ManufatureForm.reset()
          this.submitted=false;
          
          $('#update').hide();
          $('#save').show();
          
        } else {
          console.log("Update Failed :" + this.result.message)
        }
      }
      , (err) => { console.log("Error: " + err); }
    );
  }

  

  delete(id) {

    if (confirm('Are you sure you want to delete')) {
   							
      let url = 'https://api.oclinico.com/PharmacyAPI/api/manufacturer/delete-Manufacturers/'+id;
      let headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      });

      let options = new RequestOptions({ headers: headers });
      this.http.post(url,options)
        .subscribe
        (
          (res) => {
            this.result = res;
            if (this.result.Result == true) {
              console.log("Success");
              this.tablegrid();
              alert("Deleted Successfully");
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





