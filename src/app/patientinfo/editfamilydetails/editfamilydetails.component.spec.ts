import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfamilydetailsComponent } from './editfamilydetails.component';

describe('EditfamilydetailsComponent', () => {
  let component: EditfamilydetailsComponent;
  let fixture: ComponentFixture<EditfamilydetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditfamilydetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfamilydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
