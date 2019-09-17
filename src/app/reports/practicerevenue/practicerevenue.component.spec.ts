import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticerevenueComponent } from './practicerevenue.component';

describe('PracticerevenueComponent', () => {
  let component: PracticerevenueComponent;
  let fixture: ComponentFixture<PracticerevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticerevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticerevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
