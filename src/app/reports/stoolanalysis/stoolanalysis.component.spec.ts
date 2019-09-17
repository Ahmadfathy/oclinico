import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoolanalysisComponent } from './stoolanalysis.component';

describe('StoolanalysisComponent', () => {
  let component: StoolanalysisComponent;
  let fixture: ComponentFixture<StoolanalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoolanalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoolanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
