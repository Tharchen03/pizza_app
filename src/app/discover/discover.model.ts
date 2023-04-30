export class Discover{
    getDiscover(discoverId: string) {
      throw new Error('Method not implemented.');
    }
    constructor (
        
    public id:string,
    public title:string,
    public description:string,
    public imageUrl:string,
    public price:number,
    public availableFrom: Date,
    public  availableTo: Date,
    public userId: string,
  
    ) {}

}