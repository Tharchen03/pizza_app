import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DiscoverService } from '../discover.service';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  searchValue:string;
  menuArray:any=[]
  slidingTime={
    initialSlide:1,
    speed:1000,
    loop:true,
    autoplay:{
      delay:1000
    }
  }
  constructor(private discoverService:DiscoverService,
    private alertController: AlertController,
    private router:Router) {
      
     }
  ngOnInit() {
    this.menuArray =this.discoverService.menu;
    console.log(this.menuArray);
    
  }
async presentAlert(id:string) {
  const alert = await this.alertController.create({
    header: 'Are you sure? You wana order!',
    cssClass: 'custom-alert',
    buttons: [
      {
        text: 'No',
        cssClass: 'alert-button-cancel',
      },
      {
        text: 'Yes',
        cssClass: 'alert-button-confirm',
        handler: () =>{
          this.router.navigate(["discover", "tabs", "menu", "menu-detail", id ])
          
        }
      },
    ],
  });

  await alert.present();
};

getId(id:string){
  this.router.navigate(["discover", "tabs", "menu", "menu-detail", id ])
}

menu(event:any){
  this.menuArray = this.discoverService.menu;
  this.menuArray = this.menuArray.filter((value)=> {
    return value.title.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
  })
}
}
// ion-slides {
//   height: 100%;
// }