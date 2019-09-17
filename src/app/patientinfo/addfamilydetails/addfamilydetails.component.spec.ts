import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfamilydetailsComponent } from './addfamilydetails.component';

describe('AddfamilydetailsComponent', () => {
  let component: AddfamilydetailsComponent;
  let fixture: ComponentFixture<AddfamilydetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddfamilydetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfamilydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
