import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErviewpatientComponent } from './erviewpatient.component';

describe('ErviewpatientComponent', () => {
  let component: ErviewpatientComponent;
  let fixture: ComponentFixture<ErviewpatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErviewpatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErviewpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
