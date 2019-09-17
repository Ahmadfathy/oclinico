import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddoccupationssettingsComponent } from './addoccupationssettings.component';

describe('AddoccupationssettingsComponent', () => {
  let component: AddoccupationssettingsComponent;
  let fixture: ComponentFixture<AddoccupationssettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddoccupationssettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddoccupationssettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
