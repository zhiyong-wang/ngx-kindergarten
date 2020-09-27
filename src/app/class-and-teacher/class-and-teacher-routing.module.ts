import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import{ ClassAndTeacherComponent} from './class-and-teacher/class-and-teacher.component';
import{ ClassManageComponent} from './class-manage/class-manage.component'
import{ ClassCreateComponent} from './class-create/class-create.component'
const ClassAndTeacherRoutes: Routes = [
  {path: 'class-and-teacher',
  component: ClassAndTeacherComponent,
  children: [

    { path: '',  component: TeacherListComponent },
    { path: 'detail/:id', component: TeacherDetailComponent},
    { path: 'detail', component: TeacherDetailComponent},
    { path:'classManage', component: ClassManageComponent},
    { path:'classCreate', component: ClassCreateComponent}
]
}
  
];

@NgModule({
  imports: [
    RouterModule.forChild(ClassAndTeacherRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ClassAndTeacherRoutingModule { }