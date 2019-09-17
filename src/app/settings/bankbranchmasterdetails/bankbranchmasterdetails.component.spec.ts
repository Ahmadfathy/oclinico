import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankbranchmasterdetailsComponent } from './bankbranchmasterdetails.component';

describe('BankbranchmasterdetailsComponent', () => {
  let component: BankbranchmasterdetailsComponent;
  let fixture: ComponentFixture<BankbranchmasterdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankbranchmasterdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankbranchmasterdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
