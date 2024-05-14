import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChamadosPage } from './chamados.page';

const routes: Routes = [
  {
    path: '',
    component: ChamadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChamadosPageRoutingModule {}
