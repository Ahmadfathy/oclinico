import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmergencyServices } from './emergency.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.css']
})
export class EmergencyComponent implements OnInit {
  productForm: FormGroup;
  EditForm: FormGroup;
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
    private Services: EmergencyServices,
    private modalService: NgbModal) {
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
      Doctor_ID: ['7', Validators.required]
    });

    this.EditForm = this.formBuilder.group({
      ID: ['', Validators.required],
      blood_Presh: ['', Validators.required],
      sugar_perc: ['', Validators.required],
      H_count: ['', Validators.required],
      Is_fat: ['', Validators.required],
      Initial_Report: ['', Validators.required]
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
        this.Services.saveNewEmergency(this.productForm.value, () => {
          alert('Successfully Inserted')
          this.productForm.reset();
          this.submitted = false;
          this.getdata();
        })
      }
    }
  }

  EditData() {
    this.submitted = true;
    if (this.EditForm.invalid) {
      return;
    }
    else {
      this.Services.updateEmergency(this.EditForm.value, () => {
        alert('Successfully Updated')
        this.EditForm.reset();
        this.submitted = false;
        this.getdata();
        this.modalService.dismissAll();
      })
    }
  }

  getdata() {
    this.Services.getAllEmergency(res => {
      this.table = res.data;
      sessionStorage.setItem('masterid', res.data[0].ID)
      console.log(this.table);
    })
  }

  getdataById(id) {
    this.Services.getEmergencyById(id, res => {
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
    // this.Services.getRoomBedById(data, res => {
    //   this.beds = res.Bed;
    //   if (this.beds.length > 0) {
    //     $("#BedID").prop('disabled', false);
    //   }
    //   else {
    //     $("#BedID").prop('disabled', true);
    //   }
    // })
  }

  getPatientData(e) {
    if (e.charCode == 13 || e.key == 'Enter') {
      this.Services.getPatientData(e.target.value, res => {
        if (res.Result) {
          $("#ptId").val(res.data.ID + " " + res.data.Obj_Name);
          // $("#ptId").prop('disabled', true);
          this.productForm.get("Patient_ID").setValue(res.data.ID);
        }
        else {
          alert('No Patient Found')
        }
      })
    }
  }

  openVerticallyCentered(content, data) {
    this.EditForm.patchValue(data);
    this.modalService.open(content, { centered: true });
  }
}



