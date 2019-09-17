import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWardsComponent } from './view-wards.component';

describe('ViewWardsComponent', () => {
  let component: ViewWardsComponent;
  let fixture: ComponentFixture<ViewWardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewWardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
