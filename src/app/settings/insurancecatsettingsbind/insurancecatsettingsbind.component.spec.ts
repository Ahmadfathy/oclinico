import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancecatsettingsbindComponent } from './insurancecatsettingsbind.component';

describe('InsurancecatsettingsbindComponent', () => {
  let component: InsurancecatsettingsbindComponent;
  let fixture: ComponentFixture<InsurancecatsettingsbindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurancecatsettingsbindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancecatsettingsbindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
