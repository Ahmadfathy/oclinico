import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufatureComponent } from './manufature.component';

describe('ManufatureComponent', () => {
  let component: ManufatureComponent;
  let fixture: ComponentFixture<ManufatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
