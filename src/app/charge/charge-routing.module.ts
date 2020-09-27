import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import{ChargeComponent} from './charge/charge.component'
import{TuitionComponent} from './tuition/tuition.component'
import {SpecialChargeComponent} from './special-charge/special-charge.component'
const ChargeRoutes: Routes = [
  {path: 'charge',
  component: ChargeComponent,
  children: [

    { path: '',  component: TuitionComponent },
    { path: 'special-charge', component: SpecialChargeComponent},
    { path: 'tuition', component: TuitionComponent},
  ]
  }
  
];

@NgModule({
  imports: [
    RouterModule.forChild(ChargeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ChargeRoutingModule { }