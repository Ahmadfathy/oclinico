import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancecatsettingsaddComponent } from './insurancecatsettingsadd.component';

describe('InsurancecatsettingsaddComponent', () => {
  let component: InsurancecatsettingsaddComponent;
  let fixture: ComponentFixture<InsurancecatsettingsaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurancecatsettingsaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancecatsettingsaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
