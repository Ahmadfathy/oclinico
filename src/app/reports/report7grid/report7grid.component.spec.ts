import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Report7gridComponent } from './report7grid.component';

describe('Report7gridComponent', () => {
  let component: Report7gridComponent;
  let fixture: ComponentFixture<Report7gridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Report7gridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Report7gridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
