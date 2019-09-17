import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiryproductsComponent } from './expiryproducts.component';

describe('ExpiryproductsComponent', () => {
  let component: ExpiryproductsComponent;
  let fixture: ComponentFixture<ExpiryproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiryproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiryproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
