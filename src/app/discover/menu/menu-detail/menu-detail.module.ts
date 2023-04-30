import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuDetailPageRoutingModule } from './menu-detail-routing.module';

import { MenuDetailPage } from './menu-detail.page';
import { CreateOrderComponent } from 'src/app/recipe-order/create-order/create-order.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuDetailPageRoutingModule
  ],
  declarations: [MenuDetailPage,CreateOrderComponent]
})
export class MenuDetailPageModule {}
