import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorTreatmentComponent } from './doctor-treatment.component';

describe('DoctorTreatmentComponent', () => {
  let component: DoctorTreatmentComponent;
  let fixture: ComponentFixture<DoctorTreatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorTreatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
