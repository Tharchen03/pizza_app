import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Discover } from 'src/app/discover/discover.model';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
})
export class CreateOrderComponent implements OnInit {
  @Input() selectedDiscover:Discover;
  @ViewChild('f') from:NgForm;

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}
  onCancel(){
    this.modalCtrl.dismiss('user cancelled','cancel');
  }
  onOrderRecipe(){
    
  if(!this.from.valid || !this.datesValid){
    return;
  }
  this.modalCtrl.dismiss(
    {
    orderingData:{
      firstname: this.from.value['first-name'],
      lasttname: this.from.value['last-name'],
      guestnumber: this.from.value['order-number'],
      startDate: new Date(this.from.value['date-from']),
      endDate:  new Date(this.from.value['date-to']),
    }
  },
  'confirm'
  );
}
datesValid(){
  const startDate = new Date(this.from.value['date-from']);
  const endDate = new Date(this.from.value['date-to']);
  return endDate > startDate;
}
}
