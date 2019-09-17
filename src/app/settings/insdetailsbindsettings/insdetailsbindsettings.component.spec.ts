import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsdetailsbindsettingsComponent } from './insdetailsbindsettings.component';

describe('InsdetailsbindsettingsComponent', () => {
  let component: InsdetailsbindsettingsComponent;
  let fixture: ComponentFixture<InsdetailsbindsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsdetailsbindsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsdetailsbindsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
