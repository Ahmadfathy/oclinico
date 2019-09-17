import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancTypeComponent } from './insuranc-type.component';

describe('InsurancTypeComponent', () => {
  let component: InsurancTypeComponent;
  let fixture: ComponentFixture<InsurancTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurancTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
