import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaymentsComponent } from './edit-payments.component';

describe('EditPaymentsComponent', () => {
  let component: EditPaymentsComponent;
  let fixture: ComponentFixture<EditPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
