import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditnumbersettingsComponent } from './editnumbersettings.component';

describe('EditnumbersettingsComponent', () => {
  let component: EditnumbersettingsComponent;
  let fixture: ComponentFixture<EditnumbersettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditnumbersettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditnumbersettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
