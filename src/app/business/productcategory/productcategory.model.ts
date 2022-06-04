export class Productcategory {
  id: number;
  businessid: number;
  srno: number;
  picpath: any;
  name:string;
  imagecode: any;
  
    constructor(object) {
        this.id = object.id || 0;
        this.businessid = object.businessid || 0;
        this.srno = object.srno || 0;
        this.picpath = object.picpath || "";
        this.name = object.name || "";
       
    }
  }
  