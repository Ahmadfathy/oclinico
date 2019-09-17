import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientUrinalreportComponent } from './patient-urinalreport.component';

describe('PatientUrinalreportComponent', () => {
  let component: PatientUrinalreportComponent;
  let fixture: ComponentFixture<PatientUrinalreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientUrinalreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientUrinalreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
