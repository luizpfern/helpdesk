import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'principal',canActivate:[AuthGuard],
    loadChildren: () => import('./principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'lista-patrimonios',canActivate: [AuthGuard],
    loadChildren: () => import('./lista-patrimonios/lista-patrimonios.module').then( m => m.ListaPatrimoniosPageModule)
  },
  {
    path: 'patrimonios',canActivate: [AuthGuard],
    loadChildren: () => import('./patrimonios/patrimonios.module').then( m => m.PatrimoniosPageModule)
  },
  {
    path: 'patrimonios/:id',canActivate: [AuthGuard],
    loadChildren: () => import('./patrimonios/patrimonios.module').then( m => m.PatrimoniosPageModule)
  },  {
    path: 'lista-usuarios',
    loadChildren: () => import('./lista-usuarios/lista-usuarios.module').then( m => m.ListaUsuariosPageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
