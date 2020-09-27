import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialChargeComponent } from './special-charge.component';

describe('SpecialChargeComponent', () => {
  let component: SpecialChargeComponent;
  let fixture: ComponentFixture<SpecialChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
