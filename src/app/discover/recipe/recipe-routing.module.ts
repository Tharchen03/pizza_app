import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipePage } from './recipe.page';

const routes: Routes = [
  {
    path: '',
    component: RecipePage
  },
  {
    path: 'edit',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'new',
    loadChildren: () => import('./new/new.module').then( m => m.NewPageModule)
  },
  {
    path: 'order-recipe',
    loadChildren: () => import('./order-recipe/order-recipe.module').then( m => m.OrderRecipePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipePageRoutingModule {}
