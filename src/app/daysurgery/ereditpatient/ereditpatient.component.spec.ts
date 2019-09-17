import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EreditpatientComponent } from './ereditpatient.component';

describe('EreditpatientComponent', () => {
  let component: EreditpatientComponent;
  let fixture: ComponentFixture<EreditpatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EreditpatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EreditpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
