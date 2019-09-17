import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralsourcesComponent } from './referralsources.component';

describe('ReferralsourcesComponent', () => {
  let component: ReferralsourcesComponent;
  let fixture: ComponentFixture<ReferralsourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralsourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralsourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
