import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinPayModeDetailsComponent } from './fin-pay-mode-details.component';

describe('FinPayModeDetailsComponent', () => {
  let component: FinPayModeDetailsComponent;
  let fixture: ComponentFixture<FinPayModeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinPayModeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinPayModeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
