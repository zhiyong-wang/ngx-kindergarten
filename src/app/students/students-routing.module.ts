import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentsListComponent } from './students-list/students-list.component';
import{StudentsComponent} from './students/students.component'
import{AttendanceComponent} from './attendance/attendance.component'
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
const studentsRoutes: Routes = [
  {path: 'students',
  component: StudentsComponent,
  children: [

    { path: '',  component: StudentsListComponent },
    { path: 'detail/:id', component: StudentDetailsComponent},
    { path: 'detail', component: StudentDetailsComponent},
    { path: 'attendance', component: AttendanceComponent},
    { path: 'attendance-list', component: AttendanceListComponent}

]
}
  
];

@NgModule({
  imports: [
    RouterModule.forChild(studentsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class StudentsRoutingModule { }
