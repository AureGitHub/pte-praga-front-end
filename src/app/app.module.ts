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
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from './services/components/alert.service';
import { AlertComponent } from './components/layout/alert/alert.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { HttpGralService } from './services/http/http.gral.service';
import { AuthenticationService } from './services/http/authentication.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemHeroService } from './services/api-fake-memory/fake-bd-ptepraga.service';
import { InterceptorService } from './services/http/interceptor.service';
import { LoadingService } from './services/components/loading.service';
import { LoadingComponent } from './components/layout/loading/loading.component';
import { NgxLoadingModule } from 'ngx-loading';
import { ListaPartidosComponent } from './components/home/lista-partidos/lista-partidos.component';
import { DatePipe } from '@angular/common';
import { DetallePartidoComponent } from './components/detalle-partido/detalle-partido.component';
import { UsersComponent } from './components/users/users.component';
import { NoAuthComponent } from './components/no-auth/no-auth.component';
import { NoFoundComponent } from './components/no-found/no-found.component';
import { AuthGuard } from './services/guard';
import { RoleGuard } from './services/guard/roles.guard';
import { ComunMenuComponent } from './components/header/comun-menu/comun-menu.component';
import { MyFormComponent } from './components/comun/my-form/my-form.component';
import { RegistroComponent } from './components/registro/registro.component';


const appRoutes: Routes = [ ]; 

@NgModule({
    declarations: [
        AppComponent,
        SideMenuComponent,
        TopMenuComponent,
        HeaderComponent,
        HomeComponent,
        LoginComponent,
        AlertComponent,
        LoadingComponent,
        ListaPartidosComponent,
        DetallePartidoComponent,
        UsersComponent,
        NoAuthComponent,
        NoFoundComponent,
        ComunMenuComponent,
        MyFormComponent,
        RegistroComponent
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
