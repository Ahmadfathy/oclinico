import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankmasterdetailsComponent } from './bankmasterdetails.component';

describe('BankmasterdetailsComponent', () => {
  let component: BankmasterdetailsComponent;
  let fixture: ComponentFixture<BankmasterdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankmasterdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankmasterdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
