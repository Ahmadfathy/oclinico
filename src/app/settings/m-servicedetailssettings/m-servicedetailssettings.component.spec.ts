import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MServicedetailssettingsComponent } from './m-servicedetailssettings.component';

describe('MServicedetailssettingsComponent', () => {
  let component: MServicedetailssettingsComponent;
  let fixture: ComponentFixture<MServicedetailssettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MServicedetailssettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MServicedetailssettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
