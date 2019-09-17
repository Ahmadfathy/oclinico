import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtreatmentComponent } from './addtreatment.component';

describe('AddtreatmentComponent', () => {
  let component: AddtreatmentComponent;
  let fixture: ComponentFixture<AddtreatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtreatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
