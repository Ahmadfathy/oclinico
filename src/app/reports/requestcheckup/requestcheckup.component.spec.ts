import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestcheckupComponent } from './requestcheckup.component';

describe('RequestcheckupComponent', () => {
  let component: RequestcheckupComponent;
  let fixture: ComponentFixture<RequestcheckupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestcheckupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestcheckupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
