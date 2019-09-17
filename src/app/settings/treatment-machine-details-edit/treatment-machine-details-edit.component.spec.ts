import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentMachineDetailsEditComponent } from './treatment-machine-details-edit.component';

describe('TreatmentMachineDetailsEditComponent', () => {
  let component: TreatmentMachineDetailsEditComponent;
  let fixture: ComponentFixture<TreatmentMachineDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentMachineDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentMachineDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
