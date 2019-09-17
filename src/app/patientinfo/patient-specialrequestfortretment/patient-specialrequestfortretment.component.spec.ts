import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSpecialrequestfortretmentComponent } from './patient-specialrequestfortretment.component';

describe('PatientSpecialrequestfortretmentComponent', () => {
  let component: PatientSpecialrequestfortretmentComponent;
  let fixture: ComponentFixture<PatientSpecialrequestfortretmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientSpecialrequestfortretmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSpecialrequestfortretmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
