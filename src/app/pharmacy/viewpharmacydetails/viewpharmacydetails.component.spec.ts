import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpharmacydetailsComponent } from './viewpharmacydetails.component';

describe('ViewpharmacydetailsComponent', () => {
  let component: ViewpharmacydetailsComponent;
  let fixture: ComponentFixture<ViewpharmacydetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewpharmacydetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpharmacydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
