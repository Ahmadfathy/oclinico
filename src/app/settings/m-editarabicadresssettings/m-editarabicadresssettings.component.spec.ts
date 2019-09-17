import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MEditarabicadresssettingsComponent } from './m-editarabicadresssettings.component';

describe('MEditarabicadresssettingsComponent', () => {
  let component: MEditarabicadresssettingsComponent;
  let fixture: ComponentFixture<MEditarabicadresssettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MEditarabicadresssettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MEditarabicadresssettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
