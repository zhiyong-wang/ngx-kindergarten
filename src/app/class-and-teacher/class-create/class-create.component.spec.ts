import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClassCreateComponent } from './class-create.component';

describe('ClassCreateComponent', () => {
  let component: ClassCreateComponent;
  let fixture: ComponentFixture<ClassCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
