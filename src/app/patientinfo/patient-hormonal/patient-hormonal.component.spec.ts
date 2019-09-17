import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHormonalComponent } from './patient-hormonal.component';

describe('PatientHormonalComponent', () => {
  let component: PatientHormonalComponent;
  let fixture: ComponentFixture<PatientHormonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientHormonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientHormonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
