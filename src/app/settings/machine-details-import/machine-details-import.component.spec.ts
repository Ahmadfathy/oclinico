import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineDetailsImportComponent } from './machine-details-import.component';

describe('MachineDetailsImportComponent', () => {
  let component: MachineDetailsImportComponent;
  let fixture: ComponentFixture<MachineDetailsImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineDetailsImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineDetailsImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
