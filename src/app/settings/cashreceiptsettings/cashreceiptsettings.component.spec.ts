import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashreceiptsettingsComponent } from './cashreceiptsettings.component';

describe('CashreceiptsettingsComponent', () => {
  let component: CashreceiptsettingsComponent;
  let fixture: ComponentFixture<CashreceiptsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashreceiptsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashreceiptsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
