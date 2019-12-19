import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radioButton';
import { CheckboxModule } from 'primeng/checkbox';

import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';

import {ButtonModule} from 'primeng/button';
import {TabMenuModule} from 'primeng/tabmenu';
import {MenubarModule} from 'primeng/menubar';
import {TieredMenuModule} from 'primeng/tieredmenu';

import {ToolbarModule} from 'primeng/toolbar';



const appRoutes: Routes = [ ];

@NgModule({
    declarations: [
        AppComponent,
        SideMenuComponent,
        TopMenuComponent
    ],
    imports: [

        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // <-- debugging purposes only
          ),

        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        TableModule,
        HttpClientModule,
        InputTextModule,
        DialogModule,
        ButtonModule,
        AccordionModule,
        PanelModule,
        RadioButtonModule,
        CheckboxModule,
        TabMenuModule,
        MenubarModule,
        TieredMenuModule,
        ToolbarModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
