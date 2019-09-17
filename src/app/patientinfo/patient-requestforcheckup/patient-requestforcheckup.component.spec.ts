import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRequestforcheckupComponent } from './patient-requestforcheckup.component';

describe('PatientRequestforcheckupComponent', () => {
  let component: PatientRequestforcheckupComponent;
  let fixture: ComponentFixture<PatientRequestforcheckupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientRequestforcheckupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientRequestforcheckupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
