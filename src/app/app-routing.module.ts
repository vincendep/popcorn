import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'movies/:id',
    loadChildren: () => import('./pages/movie-detail/movie-detail.module').then( m => m.MovieDetailPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        preloadingStrategy: PreloadAllModules,
        enableTracing: ! environment.production
      })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
