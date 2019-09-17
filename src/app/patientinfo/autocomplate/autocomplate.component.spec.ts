import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocomplateComponent } from './autocomplate.component';

describe('AutocomplateComponent', () => {
  let component: AutocomplateComponent;
  let fixture: ComponentFixture<AutocomplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocomplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocomplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
