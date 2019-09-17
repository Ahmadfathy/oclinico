import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherbranchComponent } from './anotherbranch.component';

describe('AnotherbranchComponent', () => {
  let component: AnotherbranchComponent;
  let fixture: ComponentFixture<AnotherbranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnotherbranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnotherbranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
