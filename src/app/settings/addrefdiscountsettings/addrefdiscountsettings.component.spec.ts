import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrefdiscountsettingsComponent } from './addrefdiscountsettings.component';

describe('AddrefdiscountsettingsComponent', () => {
  let component: AddrefdiscountsettingsComponent;
  let fixture: ComponentFixture<AddrefdiscountsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrefdiscountsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrefdiscountsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
