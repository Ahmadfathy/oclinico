import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditinsurancesettingsComponent } from './editinsurancesettings.component';

describe('EditinsurancesettingsComponent', () => {
  let component: EditinsurancesettingsComponent;
  let fixture: ComponentFixture<EditinsurancesettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditinsurancesettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditinsurancesettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
