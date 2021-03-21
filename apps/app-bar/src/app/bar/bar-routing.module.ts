import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'first', pathMatch: 'full' },
  {
    path: 'first',
    loadChildren: () =>
      import('./first-feature/first-feature.module').then(
        (module) => module.FirstFeatureModule
      ),
  },
  {
    path: 'second',
    loadChildren: () =>
      import('./second-feature/second-feature.module').then(
        (module) => module.SecondFeatureModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarRoutingModule {}
