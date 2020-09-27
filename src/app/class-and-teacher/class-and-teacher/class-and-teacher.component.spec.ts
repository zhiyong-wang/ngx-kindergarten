import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAndTeacherComponent } from './class-and-teacher.component';

describe('ClassAndTeacherComponent', () => {
  let component: ClassAndTeacherComponent;
  let fixture: ComponentFixture<ClassAndTeacherComponent>;

  beforeEach(async(() => {
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
