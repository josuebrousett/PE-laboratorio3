import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
 
  {
    path: 'paciente/:id', //modificar paciente
    loadChildren: () => import('./pages/paciente/paciente.module').then( m => m.PacientePageModule)
  },
  {
    path: 'paciente', // agregar paciente
    loadChildren: () => import('./pages/paciente/paciente.module').then( m => m.PacientePageModule)
  },
  {

    path: '',
    loadChildren: () => import('./tab/tab.module').then( m => m.TabPageModule)
  },
  {
    path: 'historial', //lista de historiales
    loadChildren: () => import('./pages/historial/historial.module').then( m => m.HistorialPageModule)
  },
  // {
  //   path: 'historial/:id',
  //   loadChildren: () => import('./pages/historial/historial.module').then( m => m.HistorialPageModule)
  // },
  {
    path: 'detalle-historial', // agregar historial
    loadChildren: () => import('./pages/detalle-historial/detalle-historial.module').then( m => m.DetalleHistorialPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
