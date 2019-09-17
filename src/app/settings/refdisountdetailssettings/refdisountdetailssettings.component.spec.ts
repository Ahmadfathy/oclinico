import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefdisountdetailssettingsComponent } from './refdisountdetailssettings.component';

describe('RefdisountdetailssettingsComponent', () => {
  let component: RefdisountdetailssettingsComponent;
  let fixture: ComponentFixture<RefdisountdetailssettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefdisountdetailssettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefdisountdetailssettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
