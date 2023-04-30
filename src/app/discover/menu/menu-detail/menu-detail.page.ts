import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscoverService } from '../../discover.service';

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.page.html',
  styleUrls: ['./menu-detail.page.scss'],
})
export class MenuDetailPage implements OnInit {
 
array:any=''
index:any=''
img:any=''
content:any=''
price:any=''
title:any=''
  constructor(private discoverService:DiscoverService,
    private acrivatedRoute:ActivatedRoute) { 
    this.array=this.discoverService.menu
  }

  ngOnInit() {
    console.log(this.acrivatedRoute.snapshot.paramMap.get('id'), "sdfk");
    this.array = this.discoverService.menu;
    console.log(this.array);
    this.display();
    
  }
  display(){
    this.index =this.array.findIndex((val)=>{
      return val.id === this.acrivatedRoute.snapshot.paramMap.get('id')
    })
    this.img=this.array[this.index].img;
    this.content=this.array[this.index].content;
    this.price=this.array[this.index].price;
    this.title=this.array[this.index].title;
    console.log(this.index);
    
  }

}
 