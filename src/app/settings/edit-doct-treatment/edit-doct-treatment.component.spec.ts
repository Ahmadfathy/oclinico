import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDoctTreatmentComponent } from './edit-doct-treatment.component';

describe('EditDoctTreatmentComponent', () => {
  let component: EditDoctTreatmentComponent;
  let fixture: ComponentFixture<EditDoctTreatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDoctTreatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDoctTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
