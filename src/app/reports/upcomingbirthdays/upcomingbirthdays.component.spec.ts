import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingbirthdaysComponent } from './upcomingbirthdays.component';

describe('UpcomingbirthdaysComponent', () => {
  let component: UpcomingbirthdaysComponent;
  let fixture: ComponentFixture<UpcomingbirthdaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingbirthdaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingbirthdaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
