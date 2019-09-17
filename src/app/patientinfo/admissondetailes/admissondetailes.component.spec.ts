import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissondetailesComponent } from './admissondetailes.component';

describe('AdmissondetailesComponent', () => {
  let component: AdmissondetailesComponent;
  let fixture: ComponentFixture<AdmissondetailesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissondetailesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissondetailesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
