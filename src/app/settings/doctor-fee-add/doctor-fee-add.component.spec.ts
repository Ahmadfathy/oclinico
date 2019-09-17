import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorFeeAddComponent } from './doctor-fee-add.component';

describe('DoctorFeeAddComponent', () => {
  let component: DoctorFeeAddComponent;
  let fixture: ComponentFixture<DoctorFeeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorFeeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorFeeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
