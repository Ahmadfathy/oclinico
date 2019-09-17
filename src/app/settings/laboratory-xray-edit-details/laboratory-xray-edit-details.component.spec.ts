import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryXrayEditDetailsComponent } from './laboratory-xray-edit-details.component';

describe('LaboratoryXrayEditDetailsComponent', () => {
  let component: LaboratoryXrayEditDetailsComponent;
  let fixture: ComponentFixture<LaboratoryXrayEditDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoryXrayEditDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryXrayEditDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
