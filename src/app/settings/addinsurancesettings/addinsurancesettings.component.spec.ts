import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddinsurancesettingsComponent } from './addinsurancesettings.component';

describe('AddinsurancesettingsComponent', () => {
  let component: AddinsurancesettingsComponent;
  let fixture: ComponentFixture<AddinsurancesettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddinsurancesettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddinsurancesettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
