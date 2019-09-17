import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditvisitnoteComponent } from './editvisitnote.component';

describe('EditvisitnoteComponent', () => {
  let component: EditvisitnoteComponent;
  let fixture: ComponentFixture<EditvisitnoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditvisitnoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditvisitnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
