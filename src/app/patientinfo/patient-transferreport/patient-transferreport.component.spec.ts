import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTransferreportComponent } from './patient-transferreport.component';

describe('PatientTransferreportComponent', () => {
  let component: PatientTransferreportComponent;
  let fixture: ComponentFixture<PatientTransferreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientTransferreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientTransferreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
