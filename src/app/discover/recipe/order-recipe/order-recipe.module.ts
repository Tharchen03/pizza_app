import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderRecipePageRoutingModule } from './order-recipe-routing.module';

import { OrderRecipePage } from './order-recipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderRecipePageRoutingModule
  ],
  declarations: [OrderRecipePage]
})
export class OrderRecipePageModule {}
