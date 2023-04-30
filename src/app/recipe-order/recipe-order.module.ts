import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipeOrderPageRoutingModule } from './recipe-order-routing.module';

import { RecipeOrderPage } from './recipe-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeOrderPageRoutingModule
  ],
  declarations: [RecipeOrderPage]
})
export class RecipeOrderPageModule {}
