import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailsInvoicesComponent } from './patient-details-invoices.component';

describe('PatientDetailsInvoicesComponent', () => {
  let component: PatientDetailsInvoicesComponent;
  let fixture: ComponentFixture<PatientDetailsInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDetailsInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailsInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
