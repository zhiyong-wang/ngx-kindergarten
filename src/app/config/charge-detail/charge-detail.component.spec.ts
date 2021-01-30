import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChargeDetailComponent } from './charge-detail.component';

describe('ChargeConfigComponent', () => {
  let component: ChargeDetailComponent;
  let fixture: ComponentFixture<ChargeDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
