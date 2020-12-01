import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DetallePartidoComponent } from './components/detalle-partido/detalle-partido.component';
import { NoAuthComponent } from './components/no-auth/no-auth.component';
import { NoFoundComponent } from './components/no-found/no-found.component';
import { SessionExpiredComponent } from './components/session-expired/session-expired.component';
import { RoleGuard } from './services/guard/roles.guard';
import { RegistroComponent } from './components/registro/registro.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { EstadoGuard } from './services/guard/estado.guard';
import { CambiarPasswordComponent } from './components/cambiar-password/cambiar-password.component';
import { ListaPartidosComponent } from './components/lista-partidos/lista-partidos.component';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { DetalleJugadorComponent } from './components/detalle-jugador/detalle-jugador.component';
import { PasswordOlvidadaComponent } from './components/password-olvidada/password-olvidada.component';
import { JugadorRankingComponent } from './components/jugador-ranking/jugador-ranking.component';
import { ManualPartidoComponent } from './components/manual-partido/manual-partido.component';

const routes: Routes = [
  { path: '', component: ListaPartidosComponent },
  { path: '404', component: NoAuthComponent },
  { path: 'home',      component: ListaPartidosComponent, canActivate: [EstadoGuard] },
  { path: 'login',      component: LoginComponent },
  { path: 'password-olvidada',      component: PasswordOlvidadaComponent },
  { path: 'detalle-partido/:id', component: DetallePartidoComponent, canActivate: [EstadoGuard, RoleGuard],  data: {idperfil: [1, 2] } },
  { path: 'detalle-jugador', component: DetalleJugadorComponent, canActivate: [EstadoGuard]},
  {path: 'jugadores', component : JugadoresComponent, canActivate: [EstadoGuard, RoleGuard],  data: {idperfil: [1] }},
  { path: 'registro', component: RegistroComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  { path: 'cambiar-password', component: CambiarPasswordComponent },
  { path: 'not-found', component: NoFoundComponent },
  { path: 'session-expired', component: SessionExpiredComponent },
  { path: 'jugadores-ranking', component: JugadorRankingComponent, canActivate: [EstadoGuard] },
  { path: 'manual-partido/:id', component: ManualPartidoComponent, canActivate: [EstadoGuard] },
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
