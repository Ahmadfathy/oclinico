import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicinformationComponent } from './clinicinformation.component';

describe('ClinicinformationComponent', () => {
  let component: ClinicinformationComponent;
  let fixture: ComponentFixture<ClinicinformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicinformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
