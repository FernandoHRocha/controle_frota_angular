import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedinGuard } from './security/loggedin.guard';
import { CrudComponent } from './views/crud/crud.component'
import { ListComponent } from '@components/index';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './security/login/login.component';
import { HomeComponent } from './views';

export const routes: Routes = [
  {
    path:"",
    component:LoginComponent
  },
  {
    path: 'sobre',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login/:to',
    component: LoginComponent
  },
  {
    path: 'criar',
    redirectTo: 'frota/criar'
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
        loadChildren: () => import('@components/create/create.module').then(m => m.CreateModule),
        canLoad: [LoggedinGuard],
        canActivate: [LoggedinGuard]
      }
    ]
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
