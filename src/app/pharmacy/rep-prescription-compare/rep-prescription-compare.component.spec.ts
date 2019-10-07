import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RepPrescriptionCompareComponent } from './rep-prescription-compare.component';

describe('RepPrescriptionCompareComponent', () => {
  let component: RepPrescriptionCompareComponent;
  let fixture: ComponentFixture<RepPrescriptionCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepPrescriptionCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepPrescriptionCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
