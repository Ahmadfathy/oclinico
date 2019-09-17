import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddinsucoversettingsComponent } from './addinsucoversettings.component';

describe('AddinsucoversettingsComponent', () => {
  let component: AddinsucoversettingsComponent;
  let fixture: ComponentFixture<AddinsucoversettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddinsucoversettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddinsucoversettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
