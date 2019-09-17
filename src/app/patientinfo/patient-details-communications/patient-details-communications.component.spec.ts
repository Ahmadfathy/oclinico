import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailsCommunicationsComponent } from './patient-details-communications.component';

describe('PatientDetailsCommunicationsComponent', () => {
  let component: PatientDetailsCommunicationsComponent;
  let fixture: ComponentFixture<PatientDetailsCommunicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDetailsCommunicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailsCommunicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
