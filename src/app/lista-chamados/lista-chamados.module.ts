import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaChamadosPageRoutingModule } from './lista-chamados-routing.module';

import { ListaChamadosPage } from './lista-chamados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaChamadosPageRoutingModule
  ],
  declarations: [ListaChamadosPage]
})
export class ListaChamadosPageModule {}
