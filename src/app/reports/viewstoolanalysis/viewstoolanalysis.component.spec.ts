import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewstoolanalysisComponent } from './viewstoolanalysis.component';

describe('ViewstoolanalysisComponent', () => {
  let component: ViewstoolanalysisComponent;
  let fixture: ComponentFixture<ViewstoolanalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewstoolanalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewstoolanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
