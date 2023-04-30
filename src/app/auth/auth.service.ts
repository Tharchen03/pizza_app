import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { map, tap} from 'rxjs/operators';
import { Storage} from '@capacitor/storage';
import { User } from './user.model';
export interface AuthResponseData{
  kind : string;
  idToken: string;
  email: string;
  refeshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}
 
  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private _user= new BehaviorSubject<User>(null)
    get userIsAuthenticated(){
      return this._user.asObservable().pipe(
        map(user =>{
          if(user){
            return !!user.token;
          }else{
            return false;
          }
        })
      );
    }
    get userId(){
      return this._user.asObservable().pipe(
        map(user =>{
          if(user){
            return user.id;
          }
          else{
            return null
          }
        })
      );
    }
    constructor(private http:HttpClient) {}
  
    signup(email: string, password:string){
      return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjapPo-tYQcdL_3n0sE2xkfbIEFNbmXuA`,
        {email : email, password: password, returnSecureToken: true}
      )
      .pipe(tap(this.setUserData.bind(this)));
    }
    login(email:string, password:string){
      return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjapPo-tYQcdL_3n0sE2xkfbIEFNbmXuA`,
        {email:email, password:password, returnSecureToken: true}
      )
      .pipe(tap(this.setUserData.bind(this)));
    }
    logout(){
      this._user.next(null);
    }
    private setUserData(userData: AuthResponseData){
      const expirationTime = new Date(
        new Date().getTime() + +userData.expiresIn * 2000
      );
      this._user.next(
        new User(
          userData.localId,
          userData.email,
          userData.idToken,
          expirationTime
        )
      );
      this.storedAuthData(
        userData.localId,
        userData.idToken,
        userData.email,
        expirationTime.toISOString(),
  
      )
    }
  
    private storedAuthData(
      userId: string,
      token: string,
      tokenExpirationDate:string,
      email: string
    ){
      const data = JSON.stringify({
        userId: userId,
        token: token,
        tokenExpirationDate:tokenExpirationDate,
        email: email
  
      });
      Storage.set({ key: 'authData', value: data});
    }
    autoLogin(){
      return from(Storage.get({ key: 'authData'})).pipe(
        map(storeData =>{
          if(!storeData || !storeData.value){
            return null;
          }
          const parseData = JSON.parse(storeData.value) as {
            token: string;
            tokenExpirationDate: string;
            userId: string;
            email: string;
          };
          const expirationTime =new Date(parseData.tokenExpirationDate);
          if(expirationTime <= new Date()){
            return null;
          }
          const user = new User(
            parseData.userId,
            parseData.email,
            parseData.token,
            expirationTime
          );
          return user;
        }),
        tap(user =>{
          if (user){
            this._user.next(user);
          }
        }),
        map(user =>{
          // console.log(user);
          // console.log(!!user);
          return !!user;
        })
      )
    }
  }