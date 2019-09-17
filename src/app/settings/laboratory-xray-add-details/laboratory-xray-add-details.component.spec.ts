import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryXrayAddDetailsComponent } from './laboratory-xray-add-details.component';

describe('LaboratoryXrayAddDetailsComponent', () => {
  let component: LaboratoryXrayAddDetailsComponent;
  let fixture: ComponentFixture<LaboratoryXrayAddDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoryXrayAddDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryXrayAddDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
