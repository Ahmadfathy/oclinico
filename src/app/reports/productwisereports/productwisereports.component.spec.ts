import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductwisereportsComponent } from './productwisereports.component';

describe('ProductwisereportsComponent', () => {
  let component: ProductwisereportsComponent;
  let fixture: ComponentFixture<ProductwisereportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductwisereportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductwisereportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
