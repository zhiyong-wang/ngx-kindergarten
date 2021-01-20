import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StudentsModule} from './students/students.module';
import {ClassAndTeacherModule} from './class-and-teacher/class-and-teacher.module';
import {ConfigModule} from  './config/config.module';
import {ChargeModule} from './charge/charge.module'
import { IndexComponent } from './index/index.component';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { LeftMenuComponent} from './left-menu/left-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    MyDialogComponent,
    LeftMenuComponent

  ],
  imports: [
    BrowserModule,  
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatIconModule,

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
