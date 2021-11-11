import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component'
import { CrudComponent } from './views/crud/crud.component'
import { ListComponent } from '@components/index';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"frota",
    component:CrudComponent,
    children: [
      {
        path:'',
        redirectTo:'listar',
        pathMatch:'full'
      },
      {
        path:'listar',
        component: ListComponent
      },
      {
        path:'criar',
        loadChildren: () => import('@components/create/create.module').then(m => m.CreateModule)
      }
    ]
  },
  {
    path: 'sobre',
    loadChildren: () => import('./components/about/about.module').then(m => m.AboutModule)
  },
  {
    path: '**',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
