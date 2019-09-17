import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewattachmentComponent } from './viewattachment.component';

describe('ViewattachmentComponent', () => {
  let component: ViewattachmentComponent;
  let fixture: ComponentFixture<ViewattachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewattachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewattachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
