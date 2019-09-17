import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsmspackagesComponent } from './addsmspackages.component';

describe('AddsmspackagesComponent', () => {
  let component: AddsmspackagesComponent;
  let fixture: ComponentFixture<AddsmspackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsmspackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsmspackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
