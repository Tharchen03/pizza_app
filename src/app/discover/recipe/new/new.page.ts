import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { DiscoverService } from '../../discover.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  form: FormGroup;
  constructor(private discoverService:DiscoverService,
    private loadingCtrl:LoadingController,
    private router:Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      price: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      dateFrom: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateTo: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required]
    })
  });
  }
  onCreateRecipe(){
    if (!this.form.valid){
      return;
    }
    this.loadingCtrl
    .create({
      message:'Create place...'
    })
    .then(loadingCtrl=>{
      loadingCtrl.present();
      this.discoverService
    
    .addDiscover(
      this.form.value.title,
      this.form.value.description,
      this.form.value.price,                         
      new Date(this.form.value.dateFrom),
      new Date(this.form.value.dateTo)
      
    ).subscribe(()=>{
      loadingCtrl.dismiss();
      this.form.reset();
      this.router.navigate(['/discover/tabs/recipe']);
    });
  });
 }
}