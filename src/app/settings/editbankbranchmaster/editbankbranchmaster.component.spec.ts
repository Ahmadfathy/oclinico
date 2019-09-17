import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbankbranchmasterComponent } from './editbankbranchmaster.component';

describe('EditbankbranchmasterComponent', () => {
  let component: EditbankbranchmasterComponent;
  let fixture: ComponentFixture<EditbankbranchmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditbankbranchmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditbankbranchmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
