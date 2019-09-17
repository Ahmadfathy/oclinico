import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XRayRequestComponent } from './x-ray-request.component';

describe('XRayRequestComponent', () => {
  let component: XRayRequestComponent;
  let fixture: ComponentFixture<XRayRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XRayRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XRayRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
