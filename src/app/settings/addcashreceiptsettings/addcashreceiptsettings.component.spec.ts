import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcashreceiptsettingsComponent } from './addcashreceiptsettings.component';

describe('AddcashreceiptsettingsComponent', () => {
  let component: AddcashreceiptsettingsComponent;
  let fixture: ComponentFixture<AddcashreceiptsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcashreceiptsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcashreceiptsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
