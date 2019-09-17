import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmspackagesdetailsComponent } from './smspackagesdetails.component';

describe('SmspackagesdetailsComponent', () => {
  let component: SmspackagesdetailsComponent;
  let fixture: ComponentFixture<SmspackagesdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmspackagesdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmspackagesdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
