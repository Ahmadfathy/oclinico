import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctTreatmentComponent } from './add-doct-treatment.component';

describe('AddDoctTreatmentComponent', () => {
  let component: AddDoctTreatmentComponent;
  let fixture: ComponentFixture<AddDoctTreatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDoctTreatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDoctTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
