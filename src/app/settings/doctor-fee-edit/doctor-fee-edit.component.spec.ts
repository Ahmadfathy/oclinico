import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorFeeEditComponent } from './doctor-fee-edit.component';

describe('DoctorFeeEditComponent', () => {
  let component: DoctorFeeEditComponent;
  let fixture: ComponentFixture<DoctorFeeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorFeeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorFeeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
