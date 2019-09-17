import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationsdetailssettingsComponent } from './occupationsdetailssettings.component';

describe('OccupationsdetailssettingsComponent', () => {
  let component: OccupationsdetailssettingsComponent;
  let fixture: ComponentFixture<OccupationsdetailssettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccupationsdetailssettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupationsdetailssettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
