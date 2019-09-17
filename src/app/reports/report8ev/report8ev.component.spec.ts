import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Report8evComponent } from './report8ev.component';

describe('Report8evComponent', () => {
  let component: Report8evComponent;
  let fixture: ComponentFixture<Report8evComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Report8evComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Report8evComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
