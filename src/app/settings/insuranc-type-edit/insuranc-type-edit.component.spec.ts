import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancTypeEditComponent } from './insuranc-type-edit.component';

describe('InsurancTypeEditComponent', () => {
  let component: InsurancTypeEditComponent;
  let fixture: ComponentFixture<InsurancTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurancTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
