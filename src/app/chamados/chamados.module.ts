import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChamadosPageRoutingModule } from './chamados-routing.module';

import { ChamadosPage } from './chamados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChamadosPageRoutingModule
  ],
  declarations: [ChamadosPage]
})
export class ChamadosPageModule {}
