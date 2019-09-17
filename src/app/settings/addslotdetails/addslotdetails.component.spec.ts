import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddslotdetailsComponent } from './addslotdetails.component';

describe('AddslotdetailsComponent', () => {
  let component: AddslotdetailsComponent;
  let fixture: ComponentFixture<AddslotdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddslotdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddslotdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
