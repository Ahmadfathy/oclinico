import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientBiochemistryComponent } from './patient-biochemistry.component';

describe('PatientBiochemistryComponent', () => {
  let component: PatientBiochemistryComponent;
  let fixture: ComponentFixture<PatientBiochemistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientBiochemistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientBiochemistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
