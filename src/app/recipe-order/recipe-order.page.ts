import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { OrderService } from './order.service';
import { Ordering } from './recipe-order.model';

@Component({
  selector: 'app-recipe-order',
  templateUrl: './recipe-order.page.html',
  styleUrls: ['./recipe-order.page.scss'],
})
export class RecipeOrderPage implements OnInit {
  loadedOrdering:Ordering[];
  isloading : boolean;
  private orderingSub: Subscription;
 
  constructor(private orderService:OrderService,
   private router:Router,
   private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.orderingSub = this.orderService.orderings.subscribe(orderings =>{
      this.loadedOrdering= orderings;
      console.log(this.loadedOrdering);
      
    });
    this.isloading = true;
    this.orderService.fetchOrderings().subscribe(() =>{
      this.isloading = false;
    })
  }
  
  onCancelOrdering(orderedId:string,SlidingOrdering:IonItemSliding){
    SlidingOrdering.close();
    this.loadingCtrl.create({message : 'cancelling...'}).then(loadingEl =>{
      loadingEl.present();
      this.orderService.cancelOrdering(orderedId).subscribe(()=>{
        loadingEl.dismiss();
      });
    });
  }
  ngOnDestroy(){
    if (this.orderingSub){
      this.orderingSub.unsubscribe();
    }
  }
}

