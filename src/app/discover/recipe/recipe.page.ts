import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Discover } from '../discover.model';
import { DiscoverService } from '../discover.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {
  recipes:Discover[ ];
  private discoverSub: Subscription;
  isloading: boolean;
  constructor(private discoverService:DiscoverService,
    private router:Router) { }

  placeIndex:number=0;
  
  ngOnInit() {
    // this.offers = this.placeService.allPlaces;
    this.discoverSub = this.discoverService.discovers.subscribe(discovers =>{
      this.recipes = discovers;
    });
    this.discoverService.fetchDiscover().subscribe(()=>{
      this.isloading = false;
    });
  }
  onEdit(recipeId:string,ionItemSliding:IonItemSliding){
    ionItemSliding.close();
    this.router.navigate(['/','discover','tabs','recipe','edit',recipeId]);
    console.log(recipeId,ionItemSliding);
  }
  
ngOnDestroy(){
  if(this.discoverSub){
    this.discoverSub.unsubscribe();
  }
}
} 