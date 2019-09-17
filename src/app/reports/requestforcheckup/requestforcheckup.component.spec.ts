import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestforcheckupComponent } from './requestforcheckup.component';

describe('RequestforcheckupComponent', () => {
  let component: RequestforcheckupComponent;
  let fixture: ComponentFixture<RequestforcheckupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestforcheckupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestforcheckupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
