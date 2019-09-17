import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientReport8Component } from './patient-report8.component';

describe('PatientReport8Component', () => {
  let component: PatientReport8Component;
  let fixture: ComponentFixture<PatientReport8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientReport8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientReport8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
