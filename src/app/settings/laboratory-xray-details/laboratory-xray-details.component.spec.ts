import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryXrayDetailsComponent } from './laboratory-xray-details.component';

describe('LaboratoryXrayDetailsComponent', () => {
  let component: LaboratoryXrayDetailsComponent;
  let fixture: ComponentFixture<LaboratoryXrayDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoryXrayDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryXrayDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
