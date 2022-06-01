export class District {
    id: number;
    name: string;
   stateid:number;
    constructor(district) {
        this.id = district.id || 0;
        this.name = district.name || "";
       this.stateid  =district.stateid || 0;
    }
  }
  