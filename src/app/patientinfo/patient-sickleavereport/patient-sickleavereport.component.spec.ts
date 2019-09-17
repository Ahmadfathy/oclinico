import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSickleavereportComponent } from './patient-sickleavereport.component';

describe('PatientSickleavereportComponent', () => {
  let component: PatientSickleavereportComponent;
  let fixture: ComponentFixture<PatientSickleavereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientSickleavereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSickleavereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
