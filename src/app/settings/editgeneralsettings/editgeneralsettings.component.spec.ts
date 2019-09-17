import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditgeneralsettingsComponent } from './editgeneralsettings.component';

describe('EditgeneralsettingsComponent', () => {
  let component: EditgeneralsettingsComponent;
  let fixture: ComponentFixture<EditgeneralsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditgeneralsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditgeneralsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
