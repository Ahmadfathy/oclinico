import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MAdddepartmentsettingsComponent } from './m-adddepartmentsettings.component';

describe('MAdddepartmentsettingsComponent', () => {
  let component: MAdddepartmentsettingsComponent;
  let fixture: ComponentFixture<MAdddepartmentsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MAdddepartmentsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MAdddepartmentsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
