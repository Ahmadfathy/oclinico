import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestProductListComponent } from './requestproductlist.component';

describe('XRayComponent', () => {
  let component: RequestProductListComponent;
  let fixture: ComponentFixture<RequestProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
