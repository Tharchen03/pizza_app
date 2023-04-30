import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, take, switchMap, tap} from 'rxjs/operators';
import { Discover } from './discover.model';
interface DiscoverData{
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
}
@Injectable({
  providedIn: 'root'
})
export class DiscoverService {

  private _discovers = new BehaviorSubject<Discover[]>([])
  get discovers(){
  return this._discovers.asObservable();
  discoverId: String
}
discoverId: String
menu=[]=[
  {
    id:'m1',
    title:'Beef Pizza',
    img:'https://www.marions-kochbuch.de/dru-pic/8348.jpg',
    content:'In a skillet, cook ground beef, onion, garlic...',
    price:350
  },
  {
    id:'m2',
    title:'Chicken Pizza',
    img:'https://shop.asanhai.pk/public/storage/media/piwzPfrkObzZCrXWeWpCvHV38QgYviXUtZcKXGER.jpeg',
    content:'1 Tbsp Chili 2 Boneless and skinless chicken...',
    price:300
  },
  {
    id:'m3',
    title:'Seafood Pizza',
    img:'https://www.bacinos.com/wp-content/uploads/2021/05/30-Seafood-Pizza-Recipes.jpg',
    content:'Saute garlic in olive oil for several minutes...',
    price:400
  },
  {
    id:'m4',
    title:'Pork Pizza',
    img:'https://media.timeout.com/images/105816722/750/422/image.jpg',
    content:'1 Tbsp Chili 2 Boneless and skinless chicken...',
    price:300
  },
  {
    id:'m5',
    title:'Mushroom Pizza',
    img:'http://www.popuppizzalv.com/wp-content/uploads/2013/05/the_5th_street.jpeg',
    content:'This mushroom pizza is a white pizza that...',
    price:250
  },
  {
    id:'m6',
    title:'Deluxe Veggie Pizza',
    img:'https://vegplatter.in/files/public/images/partner/menu/4/veg%20deluxe%20pizza.png',
    content:'Vegetarians craving a delicious treat should try Deluxe...',
    price:300
  },
  {
    id:'m7',
    title:'Peppy Paneer Pizza',
    img:'https://i.ytimg.com/vi/GWxACwK8KeA/maxresdefault.jpg',
    content:'Diced paneer cheese, cherry tomatoes, sliced red...',
    price:400
  },
  {
    id:'m8',
    title:'Veg Extravaganza Pizza',
    img:'https://tatis.my/demo/pizza/wp-content/uploads/2019/01/Product9-1.png',
    content:'A pizza that decidedly staggers under an overload...',
    price:12
  },
  {
    id:'m9',
    title:'Cheese and Corn Pizza',
    img:'https://imageresizer.static9.net.au/n2OaXU2-T4xcqsmBNynGFgKFxbo=/1000x563/https%3A%2F%2Fprod.static9.net.au%2F_%2Fmedia%2F2018%2F08%2F23%2F09%2F31%2FCorn-cheese-recipe.jpg',
    content:'Order Cheese And Corn Pizza Online From Domino...',
    price:150
  },
  {
    id:'m10',
    title:'Tomato Pizza',
    img:'https://galbanicheese.com/wp-content/uploads/2019/09/Margherita-Pizza-72DPI-e1534358128224-800x504.jpg',
    content:'Easy tomato pizzas ; low in, salt, 0.53g ; ROAST...',
    price:250
  },
  {
    id:'m11',
    title:'Greenchilli Pizza',
    img:'https://5.imimg.com/data5/MJ/NQ/MY-53040683/veg-pie-500x500.jpg',
    content:'The only pizza with a flare of south east...',
    price:120
  },
  {
    id:'m12',
    title:'Chilli burger With Pepper Relish Bugger',
    img:'https://img.taste.com.au/o_otG-Ku/w1200-h630-cfill/taste/2016/11/tandoori-chicken-burger-with-mango-chutney-39016-1.jpeg',
    content:'A spiced lamb patty slapped between burger buns...',
    price:160
  },
  {
    id:'m13',
    title:'Lamb and Tomato Stuffed Burger',
    img:'https://images.bolt.eu/store/2021/2021-10-29/d21ed50c-92c9-4bc3-9234-f20b154d66f4.png',
    content:'Ingredients of Lamb and Tomato Burgers · 1 medium...',
    price:180
  },
  {
    id:'m14',
    title:'Crunchy Chicken and Fish Burger',
    img:'https://www.pngitem.com/pimgs/m/456-4563296_crispychicken-crispy-fried-chicken-burgers-hd-png-download.png',
    content:'Breads and pastas are more sustainable than other...',
    price:200
  },
  {
    id:'m15',
    title:'Linguine Pasta',
    img:'https://www.picng.com/upload/pasta/png_pasta_15088.png',
    content:'The only pizza with a flare of south east...',
    price:299
  },
  {
    id:'m16',
    title:'Rigatoni pasta',
    img:'https://cdn.cdkitchen.com/images/cats/21/cat-21-720-1.jpg',
    content:'Pasta Divella Rigatoni Macaroni Spaghetti, fettuccine...',
    price:120
  },
  {
    id:'m17',
    title:'Fusilli Pasta',
    img:'https://myplate-prod.azureedge.us/sites/default/files/styles/large/public/2021-11/RedHotFusilli_527x323.jpg?itok=zD8eq6fs',
    content:'Pasta salad Fusilli Italian cuisine Macaroni, others, food, spiral...',
    price:300
  },
  {
    id:'m18',
    title:'Lasagne pasta',
    img:'https://www.pngitem.com/pimgs/m/143-1432598_lasagne-italian-cuisine-pasta-food-hd-png-download.png',
    content:'Lasagne Pastitsio Tayara.tn Tunis Moussaka, others, food...',
    price:190
  },
  {
    id:'m19',
    title:'Penne pasta',
    img:'https://www.seekpng.com/png/detail/13-132422_vector-royalty-free-library-pasta-vector-penne-pasta.png',
    content:'Pasta Italian cuisine Penne Rigatoni Macaroni...',
    price:260
  },
  {
    id:'m20',
    title:'Spaghetti Pasta',
    img:'https://www.nicepng.com/png/detail/11-110448_spaghetti-png-transparent-image-spaghetti-png.png',
    content:'pasta dish on fork, Pasta Spaghetti graphy, fork, food',
    price:130
  },
]
constructor(private  http:HttpClient) {}
addDiscover(title:string,
  description:string,
  price: number,
  dateFrom: Date,
  dateTo: Date
  ){

  // console.log(title,description,price,dateFrom,dateTo);
  let generatedId: string;
  const newDiscover = new Discover(
    Math.random().toString(),
    title,
    description,
    'https://hips.hearstapps.com/del.h-cdn.co/assets/17/14/1491339462-ragu-chicken-pizza-burgers-2.jpg',
    price,
    dateFrom,
    dateTo,
    'abc'
  );
  return this.http
  .post<{name: string}>
  ("https://pizzaapp-5fedc-default-rtdb.firebaseio.com/recipe-discover.json",  // .jons only present in firebase.
{
  ...newDiscover,
  id: null
})
  .pipe(
    switchMap(resData =>{
      generatedId = resData.name;
      return this.discovers;
    }),
    take(1),
    tap(discovers =>{
      newDiscover.id = generatedId;
      this._discovers.next(discovers.concat(newDiscover))
    })
  )
}
fetchDiscover() {
  return this.http
    .get<{ [key: string]: DiscoverData }>(
      `https://pizzaapp-5fedc-default-rtdb.firebaseio.com/recipe-discover.json`
    )
    .pipe(
      map(resData => {
        const discovers = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            discovers.push(
              new Discover(
                key,
                resData[key].title,
                resData[key].description,
                resData[key].imageUrl,
                resData[key].price,
                new Date(resData[key].availableFrom),
                new Date(resData[key].availableTo),
                resData[key].userId
              )
            );
          }
        }
        return discovers;
        // return [];
      }),
      tap(discovers => {
        this._discovers.next(discovers);
      })
    )
}
getDiscover(id: string) {
  return this.http
    .get<DiscoverData>(
      `https://pizzaapp-5fedc-default-rtdb.firebaseio.com/recipe-discover/${id}.json`
    )
    .pipe(
      map(discoverData => {
        return new Discover(
          id,
          discoverData.title,
          discoverData.description,
          discoverData.imageUrl,
          discoverData.price,
          new Date(discoverData.availableFrom),
          new Date(discoverData.availableTo),
          discoverData.userId
        );
      })
    )
} 
updateDiscover(discoverId: string, title: string, description: string) {
let updatedDiscover: Discover[];
return this.discovers.pipe(
  take(1),
  switchMap(discovers => {
    if (!discovers || discovers.length <= 0) {
      return this.fetchDiscover();
    } else {
      return of(discovers);
    }
  }),
  switchMap(discovers => {
    const updatedDiscoverIndex = discovers.findIndex(pl => pl.id === discoverId);
    console.log(updatedDiscoverIndex);
    
    updatedDiscover = [...discovers];
    const oldDiscover = updatedDiscover[updatedDiscoverIndex];
    updatedDiscover[updatedDiscoverIndex] = new Discover(
      oldDiscover.id,
      title,
      description,
      oldDiscover.imageUrl,
      oldDiscover.price,
      oldDiscover.availableFrom,
      oldDiscover.availableTo,
      oldDiscover.userId
    );
    return this.http.put(
      `https://pizzaapp-5fedc-default-rtdb.firebaseio.com/recipe-discover/${discoverId}.json`,
      { ...updatedDiscover[updatedDiscoverIndex], id: null }
    );
  }),
  tap(() => {
    this._discovers.next(updatedDiscover);
  })
);
}
}