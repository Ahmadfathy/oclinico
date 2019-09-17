import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbersettingsdetailsComponent } from './numbersettingsdetails.component';

describe('NumbersettingsdetailsComponent', () => {
  let component: NumbersettingsdetailsComponent;
  let fixture: ComponentFixture<NumbersettingsdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumbersettingsdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbersettingsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
