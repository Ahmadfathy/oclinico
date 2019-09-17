import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinAddPaymodeDetailsComponent } from './fin-add-paymode-details.component';

describe('FinAddPaymodeDetailsComponent', () => {
  let component: FinAddPaymodeDetailsComponent;
  let fixture: ComponentFixture<FinAddPaymodeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinAddPaymodeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinAddPaymodeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
