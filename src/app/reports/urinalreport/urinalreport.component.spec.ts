import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrinalreportComponent } from './urinalreport.component';

describe('UrinalreportComponent', () => {
  let component: UrinalreportComponent;
  let fixture: ComponentFixture<UrinalreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrinalreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrinalreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
