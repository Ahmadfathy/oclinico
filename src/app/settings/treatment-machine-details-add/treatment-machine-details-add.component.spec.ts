import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentMachineDetailsAddComponent } from './treatment-machine-details-add.component';

describe('TreatmentMachineDetailsAddComponent', () => {
  let component: TreatmentMachineDetailsAddComponent;
  let fixture: ComponentFixture<TreatmentMachineDetailsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentMachineDetailsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentMachineDetailsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
