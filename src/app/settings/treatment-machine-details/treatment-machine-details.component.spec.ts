import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentMachineDetailsComponent } from './treatment-machine-details.component';

describe('TreatmentMachineDetailsComponent', () => {
  let component: TreatmentMachineDetailsComponent;
  let fixture: ComponentFixture<TreatmentMachineDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentMachineDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentMachineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
