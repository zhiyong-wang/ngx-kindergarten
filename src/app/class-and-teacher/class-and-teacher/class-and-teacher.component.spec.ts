import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClassAndTeacherComponent } from './class-and-teacher.component';

describe('ClassAndTeacherComponent', () => {
  let component: ClassAndTeacherComponent;
  let fixture: ComponentFixture<ClassAndTeacherComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassAndTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassAndTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
