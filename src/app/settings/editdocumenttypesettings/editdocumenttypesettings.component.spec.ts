import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdocumenttypesettingsComponent } from './editdocumenttypesettings.component';

describe('EditdocumenttypesettingsComponent', () => {
  let component: EditdocumenttypesettingsComponent;
  let fixture: ComponentFixture<EditdocumenttypesettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdocumenttypesettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdocumenttypesettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
