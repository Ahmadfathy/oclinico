import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsLetterTemplateEditComponent } from './settings-letter-template-edit.component';

describe('SettingsLetterTemplateEditComponent', () => {
  let component: SettingsLetterTemplateEditComponent;
  let fixture: ComponentFixture<SettingsLetterTemplateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsLetterTemplateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsLetterTemplateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
