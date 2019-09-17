import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EraddpatientComponent } from './eraddpatient.component';

describe('EraddpatientComponent', () => {
  let component: EraddpatientComponent;
  let fixture: ComponentFixture<EraddpatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EraddpatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EraddpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
