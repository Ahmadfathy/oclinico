import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsLetterTemplateComponent } from './settings-letter-template.component';

describe('SettingsLetterTemplateComponent', () => {
  let component: SettingsLetterTemplateComponent;
  let fixture: ComponentFixture<SettingsLetterTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsLetterTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsLetterTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
