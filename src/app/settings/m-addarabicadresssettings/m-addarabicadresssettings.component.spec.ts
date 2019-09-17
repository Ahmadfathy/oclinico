import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MAddarabicadresssettingsComponent } from './m-addarabicadresssettings.component';

describe('MAddarabicadresssettingsComponent', () => {
  let component: MAddarabicadresssettingsComponent;
  let fixture: ComponentFixture<MAddarabicadresssettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MAddarabicadresssettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MAddarabicadresssettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
