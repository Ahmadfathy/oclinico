import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientReport7Component } from './patient-report7.component';

describe('PatientReport7Component', () => {
  let component: PatientReport7Component;
  let fixture: ComponentFixture<PatientReport7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientReport7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientReport7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
