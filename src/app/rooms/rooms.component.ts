import { RoomsServices } from './rooms.service'
import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  productForm: FormGroup;
  submitted = false;
  table = [];
  floors: any;
  roomtypes: any;
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
    private Services: RoomsServices) {
    this.meta.addTag({ name: 'Description', content: 'Oclinico' });
    this.meta.addTag({ name: 'Keywords', content: 'Oclinico' });
  }

  getAllFloors(){
    this.Services.getAllFloor(res => {
      this.floors = res.data;
    })
  }

  getAllRoomTypes(){
    this.Services.getAllRoomType(res => {
      this.roomtypes = res.data;
    })
  }

  ngOnInit() {
    this.getAllFloors();
    this.getAllRoomTypes();
    this.getdata();

    this.productForm = this.formBuilder.group({
      ID: [''],
      NameAr: ['', Validators.required],
      NameEng: [''],
      RoomType_ID: [''],
      Room_Floor: [''],
      Bed_Count: [''],
      Notes: ['']
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
    if (this.productForm.status == "INVALID") {
      return
    }

    if (this.btnText == "Save") {
      this.productForm.get("ID").setValue(0);
      this.Services.saveNewRoom(this.productForm.value, () => {
        alert('Successfully Inserted')
        this.productForm.reset();
        this.submitted = false;
        this.getdata();
      })
    }
    else {
      this.Services.updateRoom(this.productForm.value, () => {
        alert('Successfully Updated')
        this.productForm.reset();
        this.submitted = false;
        this.getdata();
        this.btnText = "Save";
      })
    }

  }

  getdata() {
    this.Services.getAllRooms(res => {
      this.table = res.data;
      sessionStorage.setItem('masterid', res.data[0].ID)
      console.log(this.table);
    })
  }

  getdataById(id) {
    this.Services.getRoomById(id, res => {
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
}



