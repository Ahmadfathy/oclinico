import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErpatientinfoComponent } from './erpatientinfo.component';

describe('ErpatientinfoComponent', () => {
  let component: ErpatientinfoComponent;
  let fixture: ComponentFixture<ErpatientinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErpatientinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErpatientinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
