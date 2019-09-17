import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcommunicationsComponent } from './addcommunications.component';

describe('AddcommunicationsComponent', () => {
  let component: AddcommunicationsComponent;
  let fixture: ComponentFixture<AddcommunicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcommunicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcommunicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
