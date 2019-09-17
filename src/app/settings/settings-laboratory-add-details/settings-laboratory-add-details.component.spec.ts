import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsLaboratoryAddDetailsComponent } from './settings-laboratory-add-details.component';

describe('SettingsLaboratoryAddDetailsComponent', () => {
  let component: SettingsLaboratoryAddDetailsComponent;
  let fixture: ComponentFixture<SettingsLaboratoryAddDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsLaboratoryAddDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsLaboratoryAddDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
