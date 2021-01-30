import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClassManageComponent } from './class-manage.component';

describe('ClassManageComponent', () => {
  let component: ClassManageComponent;
  let fixture: ComponentFixture<ClassManageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
