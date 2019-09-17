import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlettersComponent } from './viewletters.component';

describe('ViewlettersComponent', () => {
  let component: ViewlettersComponent;
  let fixture: ComponentFixture<ViewlettersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewlettersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewlettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
