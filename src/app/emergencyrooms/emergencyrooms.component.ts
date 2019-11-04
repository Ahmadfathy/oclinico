import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmergencyRoomsServices } from './emergencyrooms.service';
declare var $: any;

@Component({
  selector: 'app-emergencyrooms',
  templateUrl: './emergencyrooms.component.html',
  styleUrls: ['./emergencyrooms.component.css']
})
export class EmergencyRoomsComponent implements OnInit {
  productForm: FormGroup;
  submitted = false;
  table = [];
  rooms = [];
  patients = [];
  patientData = [];
  beds = [];
  validationType: any;
  Name: string;
  suggestedTexts: any[] = [];
  ShowAuto: boolean = false;
  public langulagetype: any = 'us';
  languageoption: string;
  Labs: any[] = [];
  btnText: string = "Save";



  constructor(private formBuilder: FormBuilder,
    private meta: Meta,
    private Services: EmergencyRoomsServices) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  getrooms() {
    this.Services.getAllRoom(res => {
      this.rooms = res.data;
      sessionStorage.setItem('masterid', res.data[0].ID)
      console.log(this.table);
    })
  }

  ngOnInit() {
    this.getrooms();
    this.getdata();

    this.productForm = this.formBuilder.group({
      ID: [''],
      Patient_ID: ['', Validators.required],
      Room_ID: ['', Validators.required],
      Check_Status: ['1', Validators.required],
      Price: ['', Validators.required],
      Discount: ['0', Validators.required],
      BedID: ['', Validators.required],
      CheckIn_Date: ['', Validators.required]
    });

  }

  get s() { return this.productForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    console.log(this.productForm.value)
  }

  insertdata() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    else {
      if (this.btnText == "Save") {
        this.productForm.get("ID").setValue(0);
        this.Services.saveNewPatientRoom(this.productForm.value, () => {
          alert('Successfully Inserted')
          this.productForm.reset();
          this.submitted = false;
          this.getdata();
        })
      }
      else {
        this.Services.updatePatientRoom(this.productForm.value, () => {
          alert('Successfully Updated')
          this.productForm.reset();
          this.submitted = false;
          this.getdata();
          this.btnText = "Save";
        })
      }
    }
  }

  getdata() {
    this.Services.getAllPatientRooms(res => {
      this.table = res.data;
      sessionStorage.setItem('masterid', res.data[0].ID)
      console.log(this.table);
    })
  }

  getdataById(id) {
    this.Services.getPatientRoomById(id, res => {
      this.productForm.patchValue(res.data);
      this.btnText = "Update";
    })
  }

  public removeValidators(form: FormGroup) {
    for (const key in form.controls) {
      form.get(key).clearValidators();
      form.get(key).updateValueAndValidity();
    }
  }

  public addValidators(form: FormGroup) {
    for (const key in form.controls) {
      form.get(key).setValidators(this.validationType[key]);
      form.get(key).updateValueAndValidity();
    }
  }

  SelectRoom(data) {
    this.Services.getRoomBedById(data, res => {
      this.beds = res.Bed;
      if (this.beds.length > 0) {
        $("#BedID").prop('disabled', false);
      }
      else {
        $("#BedID").prop('disabled', true);
      }
    })
  }

  getPatientData(e) {
    if (e.charCode == 13 || e.key == 'Enter') {
      this.Services.getPatientData(e.target.value, res => {
        if(res.Result){
          $("#ptId").val(res.data.ID + " " + res.data.Obj_Name);
          // $("#ptId").prop('disabled', true);
          this.productForm.get("Patient_ID").setValue(res.data.ID);
        }
        else{
          alert('No Patient Found')
        }
      })
    }
  }
}



