import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsLaboratoryDetailsComponent } from './settings-laboratory-details.component';

describe('SettingsLaboratoryDetailsComponent', () => {
  let component: SettingsLaboratoryDetailsComponent;
  let fixture: ComponentFixture<SettingsLaboratoryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsLaboratoryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsLaboratoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
