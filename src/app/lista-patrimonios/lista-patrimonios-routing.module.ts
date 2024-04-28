import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPatrimoniosPage } from './lista-patrimonios.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPatrimoniosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaPatrimoniosPageRoutingModule {}
