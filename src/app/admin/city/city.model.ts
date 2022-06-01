export class City {
    id: number;
    name: string;
   talukaid:string;
    constructor(city) {
        this.id = city.id || 0;
        this.name = city.name || "";
       this.talukaid  =city.talukaid || "";
    }
  }
  