import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctypedetailssettingsComponent } from './doctypedetailssettings.component';

describe('DoctypedetailssettingsComponent', () => {
  let component: DoctypedetailssettingsComponent;
  let fixture: ComponentFixture<DoctypedetailssettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctypedetailssettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctypedetailssettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
