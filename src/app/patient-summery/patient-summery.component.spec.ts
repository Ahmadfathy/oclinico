import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSummeryComponent } from './patient-summery.component';

describe('PatientSummeryComponent', () => {
  let component: PatientSummeryComponent;
  let fixture: ComponentFixture<PatientSummeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientSummeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
