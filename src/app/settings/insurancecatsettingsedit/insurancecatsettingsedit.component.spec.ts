import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancecatsettingseditComponent } from './insurancecatsettingsedit.component';

describe('InsurancecatsettingseditComponent', () => {
  let component: InsurancecatsettingseditComponent;
  let fixture: ComponentFixture<InsurancecatsettingseditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurancecatsettingseditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancecatsettingseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
