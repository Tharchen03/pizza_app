import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderRecipePage } from './order-recipe.page';

const routes: Routes = [
  {
    path: '',
    component: OrderRecipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRecipePageRoutingModule {}
