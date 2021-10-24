import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component'
import { CrudComponent } from './views/crud/crud.component'
import { CreateComponent } from './components/vehicles/create/create.component'

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },{
    path:"crud",
    component:CrudComponent
  },{
    path:"create",
    component:CreateComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
