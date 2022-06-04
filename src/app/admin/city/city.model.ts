export class City {
    id: number;
    name: string;
    stateid:number;
    constructor(city) {
        this.id = city.id || 0;
        this.name = city.name || "";
        this.stateid = city.stateid || 0;
    }
  }
  