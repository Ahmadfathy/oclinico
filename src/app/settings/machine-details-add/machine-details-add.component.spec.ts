import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineDetailsAddComponent } from './machine-details-add.component';

describe('MachineDetailsAddComponent', () => {
  let component: MachineDetailsAddComponent;
  let fixture: ComponentFixture<MachineDetailsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineDetailsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineDetailsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
