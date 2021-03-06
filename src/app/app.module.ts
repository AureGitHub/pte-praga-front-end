import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MyprimengModule } from './modules/myprimeng.module';
import { HeaderComponent } from './components/header/header.component';
import { SideMenuComponent } from './components/header/side-menu/side-menu.component';
import { TopMenuComponent } from './components/header/top-menu/top-menu.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from './services/components/alert.service';
import { AlertComponent } from './components/layout/alert/alert.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { HttpGralService } from './services/http/http.gral.service';
import { AuthenticationService } from './services/http/authentication.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/http/interceptor.service';
import { LoadingService } from './services/components/loading.service';
import { LoadingComponent } from './components/layout/loading/loading.component';
import { NgxLoadingModule } from 'ngx-loading';
import { DatePipe, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { DetallePartidoComponent } from './components/detalle-partido/detalle-partido.component';
import { NoAuthComponent } from './components/no-auth/no-auth.component';
import { NoFoundComponent } from './components/no-found/no-found.component';
import { SessionExpiredComponent } from './components/session-expired/session-expired.component';
import { AuthGuard } from './services/guard';
import { RoleGuard } from './services/guard/roles.guard';
import { ComunMenuComponent } from './components/header/comun-menu/comun-menu.component';
import { MyFormComponent } from './components/comun/my-form/my-form.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { EstadoGuard } from './services/guard/estado.guard';
import { CambiarPasswordComponent } from './components/cambiar-password/cambiar-password.component';
import { ListaPartidosComponent } from './components/lista-partidos/lista-partidos.component';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { DetalleJugadorComponent } from './components/detalle-jugador/detalle-jugador.component';
import { GlobalService } from './services/global/global.service';
import { TimeoutService } from './services/timeout.service';
import { GestionJugadoresComponent } from './components/detalle-partido/gestion-jugadores/gestion-jugadores.component';
import { CombosService } from './services/combos/combos.service';
import { PasswordOlvidadaComponent } from './components/password-olvidada/password-olvidada.component';
import { GestionPistasComponent } from './components/detalle-partido/gestion-pistas/gestion-pistas.component';
import { GestionResultadoComponent } from './components/detalle-partido/gestion-resultado/gestion-resultado.component';
import { JugadorRankingComponent } from './components/jugador-ranking/jugador-ranking.component';
import { DetallePartidosComponent } from './components/detalle-jugador/detalle-partidos/detalle-partidos.component';
import { DetalleEstadisticasComponent } from './components/detalle-jugador/detalle-estadisticas/detalle-estadisticas.component';
import { DetalleRankingComponent } from './components/detalle-jugador/detalle-ranking/detalle-ranking.component';
import { DetalleParejaComponent } from './components/detalle-jugador/detalle-pareja/detalle-pareja.component';
import { ManualPartidoComponent } from './components/manual-partido/manual-partido.component';
import { VerDatosPartidoComponent } from './components/ver-datos-partido/ver-datos-partido.component';

@NgModule({
    declarations: [
        AppComponent,
        SideMenuComponent,
        TopMenuComponent,
        HeaderComponent,
        LoginComponent,
        AlertComponent,
        LoadingComponent,
        ListaPartidosComponent,
        DetallePartidoComponent,
        JugadoresComponent,
        NoAuthComponent,
        NoFoundComponent,
        SessionExpiredComponent,
        ComunMenuComponent,
        MyFormComponent,
        RegistroComponent,
        ConfirmEmailComponent,
        CambiarPasswordComponent,
        DetalleJugadorComponent,
        GestionJugadoresComponent,
        PasswordOlvidadaComponent,
        GestionPistasComponent,
        GestionResultadoComponent,
        JugadorRankingComponent,
        DetallePartidosComponent,
        DetalleEstadisticasComponent,
        DetalleRankingComponent,
        DetalleParejaComponent,
        ManualPartidoComponent,
        VerDatosPartidoComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MyprimengModule,
        HttpClientModule,
        NgxLoadingModule.forRoot({}),

    ],
    providers: [
        GlobalService,
        EstadoGuard,
        AuthGuard,
        RoleGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true
          },
          {provide: LocationStrategy, useClass: HashLocationStrategy},
          DatePipe,
        AlertService,
        LoadingService,
        MessageService,
        HttpGralService,
        AuthenticationService,
        ConfirmationService,
        TimeoutService,
        CombosService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
