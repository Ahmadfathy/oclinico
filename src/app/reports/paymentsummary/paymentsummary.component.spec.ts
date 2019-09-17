import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsummaryComponent } from './paymentsummary.component';

describe('PaymentsummaryComponent', () => {
  let component: PaymentsummaryComponent;
  let fixture: ComponentFixture<PaymentsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
