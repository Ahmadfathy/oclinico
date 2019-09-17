import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddjobtitleComponent } from './addjobtitle.component';

describe('AddjobtitleComponent', () => {
  let component: AddjobtitleComponent;
  let fixture: ComponentFixture<AddjobtitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddjobtitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddjobtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
