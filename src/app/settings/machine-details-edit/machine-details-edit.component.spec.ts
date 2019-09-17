import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineDetailsEditComponent } from './machine-details-edit.component';

describe('MachineDetailsEditComponent', () => {
  let component: MachineDetailsEditComponent;
  let fixture: ComponentFixture<MachineDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
