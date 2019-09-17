import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MDepartmentspecificationsComponent } from './m-departmentspecifications.component';

describe('MDepartmentspecificationsComponent', () => {
  let component: MDepartmentspecificationsComponent;
  let fixture: ComponentFixture<MDepartmentspecificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MDepartmentspecificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MDepartmentspecificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
