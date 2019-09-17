import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsLetterTemplateViewComponent } from './settings-letter-template-view.component';

describe('SettingsLetterTemplateViewComponent', () => {
  let component: SettingsLetterTemplateViewComponent;
  let fixture: ComponentFixture<SettingsLetterTemplateViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsLetterTemplateViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsLetterTemplateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
