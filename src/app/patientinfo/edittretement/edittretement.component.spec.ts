import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittretementComponent } from './edittretement.component';

describe('EdittretementComponent', () => {
  let component: EdittretementComponent;
  let fixture: ComponentFixture<EdittretementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittretementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittretementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
