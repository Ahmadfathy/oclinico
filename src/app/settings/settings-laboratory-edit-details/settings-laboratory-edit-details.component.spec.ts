import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsLaboratoryEditDetailsComponent } from './settings-laboratory-edit-details.component';

describe('SettingsLaboratoryEditDetailsComponent', () => {
  let component: SettingsLaboratoryEditDetailsComponent;
  let fixture: ComponentFixture<SettingsLaboratoryEditDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsLaboratoryEditDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsLaboratoryEditDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
