import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbankmasterComponent } from './editbankmaster.component';

describe('EditbankmasterComponent', () => {
  let component: EditbankmasterComponent;
  let fixture: ComponentFixture<EditbankmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditbankmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditbankmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
