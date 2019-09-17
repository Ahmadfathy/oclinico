import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentscheduleComponent } from './appointmentschedule.component';

describe('AppointmentscheduleComponent', () => {
  let component: AppointmentscheduleComponent;
  let fixture: ComponentFixture<AppointmentscheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentscheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
