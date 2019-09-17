import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewxrayComponent } from './viewxray.component';

describe('ViewxrayComponent', () => {
  let component: ViewxrayComponent;
  let fixture: ComponentFixture<ViewxrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewxrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewxrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
