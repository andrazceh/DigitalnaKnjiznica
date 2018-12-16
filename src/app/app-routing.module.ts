import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'publikacija/:id', loadChildren: './pages/publikacija/publikacija.module#PublikacijaPageModule' },
  { path: 'advanced', loadChildren: './advanced/advanced.module#AdvancedPageModule' },
  { path: 'favorites', loadChildren: './favorites/favorites.module#FavoritesPageModule' },
  { path: 'viewer/:id', loadChildren: './pages/viewer/viewer.module#ViewerPageModule' },
  { path: 'browse', loadChildren: './browse/browse.module#BrowsePageModule' },
  { path: 'results/:query', loadChildren: './pages/results/results.module#ResultsPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
