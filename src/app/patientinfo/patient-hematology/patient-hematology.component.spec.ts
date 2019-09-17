import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHematologyComponent } from './patient-hematology.component';

describe('PatientHematologyComponent', () => {
  let component: PatientHematologyComponent;
  let fixture: ComponentFixture<PatientHematologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientHematologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientHematologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
