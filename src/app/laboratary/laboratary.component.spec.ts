import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborataryComponent } from './laboratary.component';

describe('LaborataryComponent', () => {
  let component: LaborataryComponent;
  let fixture: ComponentFixture<LaborataryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaborataryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaborataryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
