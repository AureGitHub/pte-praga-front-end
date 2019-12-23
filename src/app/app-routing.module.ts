import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DetallePartidoComponent } from './components/detalle-partido/detalle-partido.component';
import { UsersComponent } from './components/users/users.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home',      component: HomeComponent },
  { path: 'login',      component: LoginComponent },
  { path: 'detalle-partido/:id',      component: DetallePartidoComponent },
  {path: 'users', component : UsersComponent}
  
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  // { path: '',
  //   redirectTo: '/heroes',
  //   pathMatch: 'full'
  // },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
