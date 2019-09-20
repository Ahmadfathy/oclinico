import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XraygridComponent } from './xraygrid.component';

describe('XraygridComponent', () => {
  let component: ProductsgridComponent;
  let fixture: ComponentFixture<XraygridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XraygridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XraygridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
