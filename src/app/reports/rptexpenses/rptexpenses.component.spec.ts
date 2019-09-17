import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RptexpensesComponent } from './rptexpenses.component';

describe('RptexpensesComponent', () => {
  let component: RptexpensesComponent;
  let fixture: ComponentFixture<RptexpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RptexpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RptexpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
