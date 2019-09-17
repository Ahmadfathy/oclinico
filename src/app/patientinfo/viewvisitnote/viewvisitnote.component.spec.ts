import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewvisitnoteComponent } from './viewvisitnote.component';

describe('ViewvisitnoteComponent', () => {
  let component: ViewvisitnoteComponent;
  let fixture: ComponentFixture<ViewvisitnoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewvisitnoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewvisitnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
