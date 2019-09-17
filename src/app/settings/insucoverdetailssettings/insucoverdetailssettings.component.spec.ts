import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsucoverdetailssettingsComponent } from './insucoverdetailssettings.component';

describe('InsucoverdetailssettingsComponent', () => {
  let component: InsucoverdetailssettingsComponent;
  let fixture: ComponentFixture<InsucoverdetailssettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsucoverdetailssettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsucoverdetailssettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
