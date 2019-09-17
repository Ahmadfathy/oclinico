import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTreatmentComponent } from './import-treatment.component';

describe('ImportTreatmentComponent', () => {
  let component: ImportTreatmentComponent;
  let fixture: ComponentFixture<ImportTreatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportTreatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
