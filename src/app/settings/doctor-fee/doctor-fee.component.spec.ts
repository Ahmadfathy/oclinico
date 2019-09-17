import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorFeeComponent } from './doctor-fee.component';

describe('DoctorFeeComponent', () => {
  let component: DoctorFeeComponent;
  let fixture: ComponentFixture<DoctorFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
