import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MEditservicemastersettingsComponent } from './m-editservicemastersettings.component';

describe('MEditservicemastersettingsComponent', () => {
  let component: MEditservicemastersettingsComponent;
  let fixture: ComponentFixture<MEditservicemastersettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MEditservicemastersettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MEditservicemastersettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
