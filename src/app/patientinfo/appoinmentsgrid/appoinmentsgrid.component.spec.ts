import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentsgridComponent } from './appoinmentsgrid.component';

describe('AppoinmentsgridComponent', () => {
  let component: AppoinmentsgridComponent;
  let fixture: ComponentFixture<AppoinmentsgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppoinmentsgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppoinmentsgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
