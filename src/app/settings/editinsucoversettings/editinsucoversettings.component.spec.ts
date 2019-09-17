import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditinsucoversettingsComponent } from './editinsucoversettings.component';

describe('EditinsucoversettingsComponent', () => {
  let component: EditinsucoversettingsComponent;
  let fixture: ComponentFixture<EditinsucoversettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditinsucoversettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditinsucoversettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
