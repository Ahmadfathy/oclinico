import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditlettersComponent } from './editletters.component';

describe('EditlettersComponent', () => {
  let component: EditlettersComponent;
  let fixture: ComponentFixture<EditlettersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditlettersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditlettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
