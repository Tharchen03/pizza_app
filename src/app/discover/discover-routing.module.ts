import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscoverPage } from './discover.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/discover/tabs/menu',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    component: DiscoverPage,
      children:[
      {
          path: 'menu',
          children:[
        {path:'',
          loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
        },
        {
        path: 'menu-detail/:id',
        loadChildren: () => import('./menu/menu-detail/menu-detail.module').then(m => m.MenuDetailPageModule) 
        },
      ]
      },
      {
      path:'recipe',
        children:[
      {
        path: '',
        loadChildren: () => import('./recipe/recipe.module').then( m => m.RecipePageModule)
      },
      {
        path: 'new',
        loadChildren: () => import('./recipe/new/new.module').then( m => m.NewPageModule)
      },
      {
        path: 'edit/:discoverId',
        loadChildren: () => import('./recipe/edit/edit.module').then( m => m.EditPageModule)
      },
      {
        path: ':discoverId',
        loadChildren: () => import('./recipe/order-recipe/order-recipe.module').then( m => m.OrderRecipePageModule)
      },
    ]
    },
    {
    path: 'category',
    loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
  }
  ]
},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscoverPageRoutingModule {}
