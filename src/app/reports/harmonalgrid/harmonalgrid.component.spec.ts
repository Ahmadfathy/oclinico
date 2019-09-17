import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HarmonalgridComponent } from './harmonalgrid.component';

describe('HarmonalgridComponent', () => {
  let component: HarmonalgridComponent;
  let fixture: ComponentFixture<HarmonalgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HarmonalgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HarmonalgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
