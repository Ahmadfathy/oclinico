import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewspecialreqComponent } from './viewspecialreq.component';

describe('ViewspecialreqComponent', () => {
  let component: ViewspecialreqComponent;
  let fixture: ComponentFixture<ViewspecialreqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewspecialreqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewspecialreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
