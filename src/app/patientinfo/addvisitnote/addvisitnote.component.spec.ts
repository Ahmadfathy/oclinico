import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvisitnoteComponent } from './addvisitnote.component';

describe('AddvisitnoteComponent', () => {
  let component: AddvisitnoteComponent;
  let fixture: ComponentFixture<AddvisitnoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddvisitnoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddvisitnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
