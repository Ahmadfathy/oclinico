import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditwardsComponent } from './editwards.component';

describe('EditwardsComponent', () => {
  let component: EditwardsComponent;
  let fixture: ComponentFixture<EditwardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditwardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
