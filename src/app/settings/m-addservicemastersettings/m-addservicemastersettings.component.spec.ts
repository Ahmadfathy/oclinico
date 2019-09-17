import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MAddservicemastersettingsComponent } from './m-addservicemastersettings.component';

describe('MAddservicemastersettingsComponent', () => {
  let component: MAddservicemastersettingsComponent;
  let fixture: ComponentFixture<MAddservicemastersettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MAddservicemastersettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MAddservicemastersettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
