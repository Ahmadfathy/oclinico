import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentnotesComponent } from './treatmentnotes.component';

describe('TreatmentnotesComponent', () => {
  let component: TreatmentnotesComponent;
  let fixture: ComponentFixture<TreatmentnotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentnotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
