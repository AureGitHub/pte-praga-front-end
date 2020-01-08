import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {  Routes } from '@angular/router';

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
import { DatePipe } from '@angular/common';
import { DetallePartidoComponent } from './components/detalle-partido/detalle-partido.component';
import { NoAuthComponent } from './components/no-auth/no-auth.component';
import { NoFoundComponent } from './components/no-found/no-found.component';
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


const appRoutes: Routes = [ ];

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
        ComunMenuComponent,
        MyFormComponent,
        RegistroComponent,
        ConfirmEmailComponent,
        CambiarPasswordComponent,
        DetalleJugadorComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MyprimengModule,
        HttpClientModule,
        //HttpClientInMemoryWebApiModule.forRoot(InMemHeroService),
        NgxLoadingModule.forRoot({}),

    ],
    providers: [
        EstadoGuard,
        AuthGuard,
        RoleGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true
          },
          DatePipe,
        AlertService,
        LoadingService,
        MessageService,
        HttpGralService,
        AuthenticationService,
        ConfirmationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
