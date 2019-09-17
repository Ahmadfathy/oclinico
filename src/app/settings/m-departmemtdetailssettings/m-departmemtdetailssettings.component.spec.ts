import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MDepartmemtdetailssettingsComponent } from './m-departmemtdetailssettings.component';

describe('MDepartmemtdetailssettingsComponent', () => {
  let component: MDepartmemtdetailssettingsComponent;
  let fixture: ComponentFixture<MDepartmemtdetailssettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MDepartmemtdetailssettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MDepartmemtdetailssettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
