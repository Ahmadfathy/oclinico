import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowupssettingsComponent } from './followupssettings.component';

describe('FollowupssettingsComponent', () => {
  let component: FollowupssettingsComponent;
  let fixture: ComponentFixture<FollowupssettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowupssettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowupssettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
