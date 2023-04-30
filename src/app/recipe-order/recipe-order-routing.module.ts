import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeOrderPage } from './recipe-order.page';

const routes: Routes = [
  {
    path: '',
    component: RecipeOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeOrderPageRoutingModule {}
