import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddwardsComponent } from './addwards.component';

describe('AddwardsComponent', () => {
  let component: AddwardsComponent;
  let fixture: ComponentFixture<AddwardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddwardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
