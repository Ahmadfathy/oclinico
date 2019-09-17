import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashreportComponent } from './cashreport.component';

describe('CashreportComponent', () => {
  let component: CashreportComponent;
  let fixture: ComponentFixture<CashreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
