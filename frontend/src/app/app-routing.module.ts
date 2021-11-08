import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component'
import { CrudComponent } from './views/crud/crud.component'
import { ListComponent, CreateComponent } from '@components/index';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },{
    path:"frota",
    component:CrudComponent,
    children: [
      {path:'', redirectTo:'listar',pathMatch:'full'},
      {path:'listar', component: ListComponent},
      {path:'criar', component: CreateComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
