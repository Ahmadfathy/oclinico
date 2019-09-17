import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricewiseproductComponent } from './pricewiseproduct.component';

describe('PricewiseproductComponent', () => {
  let component: PricewiseproductComponent;
  let fixture: ComponentFixture<PricewiseproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricewiseproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricewiseproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
