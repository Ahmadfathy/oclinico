import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditjobtitleComponent } from './editjobtitle.component';

describe('EditjobtitleComponent', () => {
  let component: EditjobtitleComponent;
  let fixture: ComponentFixture<EditjobtitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditjobtitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditjobtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
