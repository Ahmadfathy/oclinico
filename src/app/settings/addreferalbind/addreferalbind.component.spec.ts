import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddreferalbindComponent } from './addreferalbind.component';

describe('AddreferalbindComponent', () => {
  let component: AddreferalbindComponent;
  let fixture: ComponentFixture<AddreferalbindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddreferalbindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddreferalbindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
