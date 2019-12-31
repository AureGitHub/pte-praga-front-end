import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DetallePartidoComponent } from './components/detalle-partido/detalle-partido.component';
import { UsersComponent } from './components/users/users.component';
import { NoAuthComponent } from './components/no-auth/no-auth.component';
import { NoFoundComponent } from './components/no-found/no-found.component';
import { RoleGuard } from './services/guard/roles.guard';
import { RegistroComponent } from './components/registro/registro.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
 
  { path: '404', component: NoAuthComponent },
  { path: 'home',      component: HomeComponent },
  { path: 'login',      component: LoginComponent },
  { path: 'detalle-partido/:id',      component: DetallePartidoComponent, canActivate: [RoleGuard],  data: {idperfil: [1,2] } },
  {path: 'users', component : UsersComponent, canActivate: [RoleGuard],  data: {idperfil: [1] }},
  { path: 'registro', component: RegistroComponent },
  { path: 'not-found', component: NoFoundComponent },
  
  
  { path: '**', redirectTo: 'not-found' },
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
