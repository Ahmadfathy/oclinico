import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditattachmentsComponent } from './editattachments.component';

describe('EditattachmentsComponent', () => {
  let component: EditattachmentsComponent;
  let fixture: ComponentFixture<EditattachmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditattachmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditattachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
