import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrinalreportEVComponent } from './urinalreport-ev.component';

describe('UrinalreportEVComponent', () => {
  let component: UrinalreportEVComponent;
  let fixture: ComponentFixture<UrinalreportEVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrinalreportEVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrinalreportEVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
