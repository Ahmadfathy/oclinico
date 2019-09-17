import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsickleaveComponent } from './viewsickleave.component';

describe('ViewsickleaveComponent', () => {
  let component: ViewsickleaveComponent;
  let fixture: ComponentFixture<ViewsickleaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsickleaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsickleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
