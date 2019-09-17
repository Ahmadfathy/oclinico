import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MDepteditspecificationComponent } from './m-depteditspecification.component';

describe('MDepteditspecificationComponent', () => {
  let component: MDepteditspecificationComponent;
  let fixture: ComponentFixture<MDepteditspecificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MDepteditspecificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MDepteditspecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
