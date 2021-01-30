import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';

IDBIndex
const routes: Routes = [ 
  {path:'classAndTeacher',redirectTo: '/class-and-teacher',},
  {path:'students', redirectTo: '/students', },
  {path:'config', redirectTo: '/config', }, 
  {path:'charge', redirectTo: '/charge', }, 
  {path: 'index',component:IndexComponent },
  {path: '',   redirectTo: '/index', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
