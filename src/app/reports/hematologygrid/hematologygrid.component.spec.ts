import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HematologygridComponent } from './hematologygrid.component';

describe('HematologygridComponent', () => {
  let component: HematologygridComponent;
  let fixture: ComponentFixture<HematologygridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HematologygridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HematologygridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
