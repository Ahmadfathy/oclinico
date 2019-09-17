import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MArabicaddrdetailsComponent } from './m-arabicaddrdetails.component';

describe('MArabicaddrdetailsComponent', () => {
  let component: MArabicaddrdetailsComponent;
  let fixture: ComponentFixture<MArabicaddrdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MArabicaddrdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MArabicaddrdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
