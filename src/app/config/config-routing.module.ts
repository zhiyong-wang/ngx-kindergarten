import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import{ConfigComponent} from './config/config.component'
import{ HolidayComponent} from './holiday/holiday.component'
import { ChargeDetailComponent } from './charge-detail/charge-detail.component'
import{ChargeListComponent}from './charge-list/charge-list.component'

const ConfigRoutes: Routes = [
  {path: 'config',
  component: ConfigComponent,
  children: [

    { path: '',  component: HolidayComponent },
    { path: 'holiday', component: HolidayComponent},
    { path: 'charge-detail/:id', component: ChargeDetailComponent},
    { path: 'charge-detail', component: ChargeDetailComponent},
    { path: 'charge', component: ChargeListComponent},

]
}
  
];

@NgModule({
  imports: [
    RouterModule.forChild(ConfigRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ConfigRoutingModule { }