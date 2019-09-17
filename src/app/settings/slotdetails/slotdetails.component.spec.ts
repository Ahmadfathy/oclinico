import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotdetailsComponent } from './slotdetails.component';

describe('SlotdetailsComponent', () => {
  let component: SlotdetailsComponent;
  let fixture: ComponentFixture<SlotdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
