import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Discover } from '../../discover.model';
import { DiscoverService } from '../../discover.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  discover: Discover;
  form: FormGroup;
  isloading: boolean = true;
  private DiscoverSub: Subscription;
  discoveredId: string='';
    constructor(private route: ActivatedRoute,
      private discoverService:DiscoverService,
      private navCtrl: NavController,
      private router: Router,
      private LoadingCtrl: LoadingController,
      private alertCtrl: AlertController,
      ) { }
  
    ngOnInit() {
        this.isloading = true;
        this.route.paramMap.subscribe(paramMap =>{
          if(!paramMap.has('discoverId')){
            this.navCtrl.navigateBack('/discover/tabs/recipe');
            return;
          }
          this.discoveredId = paramMap.get('discoverId');
          this.DiscoverSub = this.discoverService
          .getDiscover(this.discoveredId)
          .subscribe(
            discover =>{
              this.discover= discover;
              const title = this.discover.title;
              const description = this.discover.description;
              this.form = new FormGroup({
                title: new FormControl(title,{
                  updateOn:'blur',
                  validators: [Validators.required]
                }),
                description: new FormControl(description,{
                  updateOn:'blur',
                  validators:[Validators.required, Validators.maxLength(180)]
                  })
                });
  
                  this.isloading = false;
                },
                error =>{
                  this.alertCtrl
                  .create({
                    header: 'An error occered',
                    message: 'Place could not be fetched. Pleace try again later.',
                    buttons: [
                      {
                        text: 'Okey',
                        handler: ()=>{
                          this.router.navigate(['/discover/tabs/recipe']);
                        }
                      }
                    ]
                  })
                  .then(alertEl =>{
                    alertEl.present();
                    this.discoverService
                  });
                }
              );
            });
          }
 
          onUpdateRecipe(){
            if(!this.form.valid){
              return;
            }
            // console.log(this.form.value);
            this.LoadingCtrl
            .create({
              message: 'updating place...'
            })
            .then(loadingEl =>{
              loadingEl.present();
              this.discoverService
              .updateDiscover(
                this.discover.id,
                this.form.value.title,
                this.form.value.description,
              )
              .subscribe(()=>{
                loadingEl.dismiss();
                this.form.reset();
                this.router.navigate(['/discover/tabs/recipe']);
            });
          });
       }
    }