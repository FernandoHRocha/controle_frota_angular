import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component'
import { CrudComponent } from './views/crud/crud.component'

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },{
    path:"frota",
    component:CrudComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
