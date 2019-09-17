import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientXrayComponent } from './patient-xray.component';

describe('PatientXrayComponent', () => {
  let component: PatientXrayComponent;
  let fixture: ComponentFixture<PatientXrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientXrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientXrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
