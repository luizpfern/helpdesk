import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatrimoniosPage } from './patrimonios.page';

const routes: Routes = [
  {
    path: '',
    component: PatrimoniosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatrimoniosPageRoutingModule {}
