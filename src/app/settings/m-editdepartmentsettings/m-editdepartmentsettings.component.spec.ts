import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MEditdepartmentsettingsComponent } from './m-editdepartmentsettings.component';

describe('MEditdepartmentsettingsComponent', () => {
  let component: MEditdepartmentsettingsComponent;
  let fixture: ComponentFixture<MEditdepartmentsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MEditdepartmentsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MEditdepartmentsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
