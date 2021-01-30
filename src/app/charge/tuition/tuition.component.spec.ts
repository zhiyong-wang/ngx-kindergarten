import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TuitionComponent } from './tuition.component';

describe('TuitionComponent', () => {
  let component: TuitionComponent;
  let fixture: ComponentFixture<TuitionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TuitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
