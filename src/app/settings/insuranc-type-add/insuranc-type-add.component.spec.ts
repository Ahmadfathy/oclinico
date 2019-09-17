import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancTypeAddComponent } from './insuranc-type-add.component';

describe('InsurancTypeAddComponent', () => {
  let component: InsurancTypeAddComponent;
  let fixture: ComponentFixture<InsurancTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurancTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
