import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DischargedetailesComponent } from './dischargedetailes.component';

describe('DischargedetailesComponent', () => {
  let component: DischargedetailesComponent;
  let fixture: ComponentFixture<DischargedetailesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DischargedetailesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DischargedetailesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
