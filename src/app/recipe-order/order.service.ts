import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take, switchMap, tap} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Ordering } from './recipe-order.model';
interface OrderingData{
  orderedFrom:string;
  orderedTo:string;
  firstname:string;
  lastname:string;
  ordernumber:number;
  discoverId: string;
  discoverImage:string;
  discoverTitle:string;
  userId: string;
}
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private _orderings = new BehaviorSubject<Ordering[]>([]);
      get orderings(){
        return this._orderings.asObservable();
      }
  
      constructor(private authService:AuthService,
        private http:HttpClient) { }

        addOrdering(
          discoverId: string,
          discoverTitle:string,
          discoverImage:string,
          firstname:string,
          lastname:string,
          ordernumber:number,
          dateFrom:Date,
          dateTo:Date,
        ){
    let generatedId: string;
    const newOrdering = new Ordering(
      Math.random().toString(),
      discoverId,
      'abc',
      discoverTitle,
      discoverImage,
      firstname,
      lastname,
      ordernumber,
      dateFrom,
      dateTo
    );
    return this.http
    .post<{name: string}>(
      'https://pizzaapp-5fedc-default-rtdb.firebaseio.com/recipe-order.json',
      {...newOrdering, id:null}
    )
    .pipe(
      switchMap(resData =>{
        generatedId = resData.name;
        return this.orderings;
      }),
      take(1),
      tap(ordering =>{
        newOrdering.id =generatedId;
        this._orderings.next(ordering.concat(newOrdering))
      })
    );
  }
  cancelOrdering(orderedId: string){
    return this.http
    .delete(
      `https://pizzaapp-5fedc-default-rtdb.firebaseio.com/${orderedId}.json`
    )
    .pipe(
      switchMap(()=>{
        return this.orderings;
      }),
      take(1),
      tap(orderings =>{
        this._orderings.next(orderings.filter(b => b.id!== orderedId));
      })
    );
  }
  fetchOrderings(){
    return this.http
    .get<{[Key:string]:OrderingData}>(
      `https://pizzaapp-5fedc-default-rtdb.firebaseio.com/recipe-order.json?orderBy="userId"&equalTo="abc"`
    )
    .pipe(
      map(orderingData =>{
        
        console.log(orderingData);
        const orderings =[];
        for (const key in orderingData){
          if(orderingData.hasOwnProperty(key)){
            orderings.push(
              new Ordering(
                key,
                orderingData[key].discoverId,
                orderingData[key].userId,
                orderingData[key].discoverTitle,
                orderingData[key].discoverImage,
                orderingData[key].firstname,
                orderingData[key].lastname,
                orderingData[key].ordernumber,
                new Date(orderingData[key].orderedFrom),
                new Date(orderingData[key].orderedTo)
              )
            )
          }
        }
        return orderings;
      }),
      tap(orderings =>{
        this._orderings.next(orderings);
      })
    );
  }
}
