import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidelinksComponent } from './sidelinks.component';

describe('SidelinksComponent', () => {
  let component: SidelinksComponent;
  let fixture: ComponentFixture<SidelinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidelinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidelinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
