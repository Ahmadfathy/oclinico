import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfollowupssettingsComponent } from './addfollowupssettings.component';

describe('AddfollowupssettingsComponent', () => {
  let component: AddfollowupssettingsComponent;
  let fixture: ComponentFixture<AddfollowupssettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddfollowupssettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfollowupssettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
