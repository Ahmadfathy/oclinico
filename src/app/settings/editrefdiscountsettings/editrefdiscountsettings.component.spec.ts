import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditrefdiscountsettingsComponent } from './editrefdiscountsettings.component';

describe('EditrefdiscountsettingsComponent', () => {
  let component: EditrefdiscountsettingsComponent;
  let fixture: ComponentFixture<EditrefdiscountsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditrefdiscountsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditrefdiscountsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
