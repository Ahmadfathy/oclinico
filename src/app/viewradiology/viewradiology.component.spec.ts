import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewradiologyComponent } from './viewradiology.component';

describe('ViewradiologyComponent', () => {
  let component: ViewradiologyComponent;
  let fixture: ComponentFixture<ViewradiologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewradiologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewradiologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
