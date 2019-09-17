import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MDeptaddspecificationComponent } from './m-deptaddspecification.component';

describe('MDeptaddspecificationComponent', () => {
  let component: MDeptaddspecificationComponent;
  let fixture: ComponentFixture<MDeptaddspecificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MDeptaddspecificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MDeptaddspecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
