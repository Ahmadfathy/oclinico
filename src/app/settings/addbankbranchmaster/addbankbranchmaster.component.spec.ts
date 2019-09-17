import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbankbranchmasterComponent } from './addbankbranchmaster.component';

describe('AddbankbranchmasterComponent', () => {
  let component: AddbankbranchmasterComponent;
  let fixture: ComponentFixture<AddbankbranchmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbankbranchmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbankbranchmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
