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
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { EstadoGuard } from './services/guard/estado.guard';
import { CambiarPasswordComponent } from './components/cambiar-password/cambiar-password.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [EstadoGuard] },
 
  { path: '404', component: NoAuthComponent },
  { path: 'home',      component: HomeComponent, canActivate: [EstadoGuard] },
  { path: 'login',      component: LoginComponent },
  { path: 'detalle-partido/:id',      component: DetallePartidoComponent, canActivate: [EstadoGuard, RoleGuard],  data: {idperfil: [1,2] } },
  {path: 'users', component : UsersComponent, canActivate: [EstadoGuard, RoleGuard],  data: {idperfil: [1] }},
  { path: 'registro', component: RegistroComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  { path: 'cambiar-password', component: CambiarPasswordComponent },
  
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
