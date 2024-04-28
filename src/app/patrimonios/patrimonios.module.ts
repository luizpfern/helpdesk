import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatrimoniosPageRoutingModule } from './patrimonios-routing.module';

import { PatrimoniosPage } from './patrimonios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatrimoniosPageRoutingModule
  ],
  declarations: [PatrimoniosPage]
})
export class PatrimoniosPageModule {}
