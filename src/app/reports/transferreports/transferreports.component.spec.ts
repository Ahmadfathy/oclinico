import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferreportsComponent } from './transferreports.component';

describe('TransferreportsComponent', () => {
  let component: TransferreportsComponent;
  let fixture: ComponentFixture<TransferreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
