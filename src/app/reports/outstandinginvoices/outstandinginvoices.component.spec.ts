import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandinginvoicesComponent } from './outstandinginvoices.component';

describe('OutstandinginvoicesComponent', () => {
  let component: OutstandinginvoicesComponent;
  let fixture: ComponentFixture<OutstandinginvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutstandinginvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandinginvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
