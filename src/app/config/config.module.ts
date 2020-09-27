import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';

import{ConfigRoutingModule} from './config-routing.module'
import { HolidayComponent } from './holiday/holiday.component';
import { ConfigComponent } from './config/config.component';
import { ChargeDetailComponent } from './charge-detail/charge-detail.component';
import { ChargeListComponent } from './charge-list/charge-list.component'


@NgModule({
  declarations: [
    HolidayComponent, 
    ConfigComponent,  
    ChargeDetailComponent, ChargeListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ConfigRoutingModule,
    MatTableModule,
    MatMenuModule,

    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatRadioModule,
    MatDatepickerModule,
    MatMomentDateModule

  ]
})
export class ConfigModule { }
