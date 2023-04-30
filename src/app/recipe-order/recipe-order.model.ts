export class Ordering{
    constructor(
       public id:string,
       public discoverId:string,
       public userId :string,
       public discoverTitle :string,
       public placeImage:string,
       public firstname:string,
       public lastname:string,
       public ordernumber:number,
       public orderedFrom:Date,
       public orderedTo:Date,

        
    ){}
 }