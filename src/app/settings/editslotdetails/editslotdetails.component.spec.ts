import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditslotdetailsComponent } from './editslotdetails.component';

describe('EditslotdetailsComponent', () => {
  let component: EditslotdetailsComponent;
  let fixture: ComponentFixture<EditslotdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditslotdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditslotdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
