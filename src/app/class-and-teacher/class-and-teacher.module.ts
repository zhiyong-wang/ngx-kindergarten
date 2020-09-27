import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCardModule} from '@angular/material/card';

import {ClassAndTeacherRoutingModule} from './class-and-teacher-routing.module'
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { ClassAndTeacherComponent } from './class-and-teacher/class-and-teacher.component';
import { ClassManageComponent } from './class-manage/class-manage.component';
import { ClassCreateComponent } from './class-create/class-create.component';




@NgModule({
  declarations: [
    TeacherListComponent,
    TeacherDetailComponent,
    ClassAndTeacherComponent,
    ClassManageComponent,
    ClassCreateComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    ClassAndTeacherRoutingModule,

    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatMenuModule,
    MatDialogModule,
    MatExpansionModule,
    MatListModule,
    MatStepperModule,
    MatCardModule
  ]
})
export class ClassAndTeacherModule { }
