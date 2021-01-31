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
    { path: 'chargeDetail/:id', component: ChargeDetailComponent},
    { path: 'chargeDetail', component: ChargeDetailComponent},
    { path: 'chargeList', component: ChargeListComponent},

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