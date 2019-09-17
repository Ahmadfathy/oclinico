import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbankmasterComponent } from './addbankmaster.component';

describe('AddbankmasterComponent', () => {
  let component: AddbankmasterComponent;
  let fixture: ComponentFixture<AddbankmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbankmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbankmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
