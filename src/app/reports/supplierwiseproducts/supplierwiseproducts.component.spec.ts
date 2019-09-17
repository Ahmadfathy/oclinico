import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierwiseproductsComponent } from './supplierwiseproducts.component';

describe('SupplierwiseproductsComponent', () => {
  let component: SupplierwiseproductsComponent;
  let fixture: ComponentFixture<SupplierwiseproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierwiseproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierwiseproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
