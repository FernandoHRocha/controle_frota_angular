import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component'
import { CrudComponent } from './views/crud/crud.component'
import { CreateComponent, ListComponent } from '@components/index';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },{
    path:"frota",
    component:CrudComponent,
    children: [
      {path:'', redirectTo:'listar',pathMatch:'full'},
      {
        path:'listar',
        component: ListComponent},
      {
        path:'criar',
        component: CreateComponent
      }
    ]
  },{
    path: 'sobre',
    loadChildren: () => import('./components/about/about.module').then( m => m.AboutModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
