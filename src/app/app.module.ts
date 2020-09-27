import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StudentsModule} from './students/students.module';
import {ClassAndTeacherModule} from './class-and-teacher/class-and-teacher.module';
import {ConfigModule} from  './config/config.module';
import {ChargeModule} from './charge/charge.module'
import { IndexComponent } from './index/index.component';
import { MyDialogComponent } from './my-dialog/my-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    MyDialogComponent,

  ],
  imports: [
    BrowserModule,  
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatDialogModule,

    StudentsModule,
    ClassAndTeacherModule,
    ConfigModule,
    ChargeModule,
    AppRoutingModule,
  ],
  entryComponents: [
    MyDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
