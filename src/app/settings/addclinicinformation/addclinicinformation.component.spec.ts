import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddclinicinformationComponent } from './addclinicinformation.component';

describe('AddclinicinformationComponent', () => {
  let component: AddclinicinformationComponent;
  let fixture: ComponentFixture<AddclinicinformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddclinicinformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddclinicinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
