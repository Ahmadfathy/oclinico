import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-addmedication',
  templateUrl: './addmedication.component.html',
  styleUrls: ['./addmedication.component.css']
})
export class AddmedicationComponent implements OnInit {

  Medication:FormGroup;
  public titles: any = [{ 'value': '0', 'text': 'Sample' }, { 'value': '10', 'text': 'Sample1' }];
  constructor( private fb: FormBuilder,) { }

  ngOnInit() {

    this.Medication = this.fb.group({
      dosage: [''],
      frequency: [''],
      duration: [''],
      day: [''],
      generic: ['Select', [this.dropdowncnd()]],
      trade:['Select',[this.dropdowncnd()]],
      quantity: [''],
      notes: [],
      expenseEdit: this.fb.array([]),
    });
  }

  dropdowncnd() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      console.log(control.value)
      const t = control.value;
      if ((t == 'Select')) {
        return { 'required': true };
      } else {
        return null;
      }
    }
  }

  submit(){
    
  }
}
