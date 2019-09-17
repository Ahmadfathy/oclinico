import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditreferralsettingsComponent } from './editreferralsettings.component';

describe('EditreferralsettingsComponent', () => {
  let component: EditreferralsettingsComponent;
  let fixture: ComponentFixture<EditreferralsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditreferralsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditreferralsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
