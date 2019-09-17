import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditoccupationssettingsComponent } from './editoccupationssettings.component';

describe('EditoccupationssettingsComponent', () => {
  let component: EditoccupationssettingsComponent;
  let fixture: ComponentFixture<EditoccupationssettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditoccupationssettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditoccupationssettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
