import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take ,tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  authService: any;
  router: any;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.userIsAuthenticated.pipe(
        take(1),
     switchMap(isAuthenticated =>{
       if(!isAuthenticated){
         return this.authService.autoLogin();
       }
       else{
         return of(isAuthenticated);
       }
     }),
     tap(isAuthenticated =>{
       if (!isAuthenticated){
         this.router.navigateByUrl('/auth');
       }
     })
    );
 }
}
