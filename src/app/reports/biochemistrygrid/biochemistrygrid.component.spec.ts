import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiochemistrygridComponent } from './biochemistrygrid.component';

describe('BiochemistrygridComponent', () => {
  let component: BiochemistrygridComponent;
  let fixture: ComponentFixture<BiochemistrygridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiochemistrygridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiochemistrygridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
