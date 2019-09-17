import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewfollowupComponent } from './viewfollowup.component';

describe('ViewfollowupComponent', () => {
  let component: ViewfollowupComponent;
  let fixture: ComponentFixture<ViewfollowupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewfollowupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewfollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
