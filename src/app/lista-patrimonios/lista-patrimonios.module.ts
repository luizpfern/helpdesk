import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaPatrimoniosPageRoutingModule } from './lista-patrimonios-routing.module';

import { ListaPatrimoniosPage } from './lista-patrimonios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPatrimoniosPageRoutingModule
  ],
  declarations: [ListaPatrimoniosPage]
})
export class ListaPatrimoniosPageModule {}
