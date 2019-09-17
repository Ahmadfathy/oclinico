import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientStoolanalysisComponent } from './patient-stoolanalysis.component';

describe('PatientStoolanalysisComponent', () => {
  let component: PatientStoolanalysisComponent;
  let fixture: ComponentFixture<PatientStoolanalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientStoolanalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientStoolanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
