import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinEditPaymodeDetailsComponent } from './fin-edit-paymode-details.component';

describe('FinEditPaymodeDetailsComponent', () => {
  let component: FinEditPaymodeDetailsComponent;
  let fixture: ComponentFixture<FinEditPaymodeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinEditPaymodeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinEditPaymodeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
