import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ButtonModule} from 'primeng/button';
import {TabMenuModule} from 'primeng/tabmenu';
import {MenubarModule} from 'primeng/menubar';
import {TieredMenuModule} from 'primeng/tieredmenu';

import {ToolbarModule} from 'primeng/toolbar';
import {PanelModule} from 'primeng/panel';

import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DataViewModule} from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    TabMenuModule,
    MenubarModule,
    TieredMenuModule,
    ToolbarModule,
    PanelModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    ConfirmDialogModule,
    DataViewModule,
    DropdownModule,
    TableModule,
    DialogModule
  ],
  exports: [
    CommonModule,
    ButtonModule,
    TabMenuModule,
    MenubarModule,
    TieredMenuModule,
    ToolbarModule,
    PanelModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    ConfirmDialogModule,
    DataViewModule,
    DropdownModule,
    TableModule,
    DialogModule
  ]
})
export class MyprimengModule { }
