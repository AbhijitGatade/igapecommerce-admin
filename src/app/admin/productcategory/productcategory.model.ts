export class Productcategory {
  id: number;
  businessid: number;
  srno: number;
  picpath: any;
  name:string;
  imagecode: any;
  
    constructor(productcategory) {
        this.id = productcategory.id || 0;
        this.businessid = productcategory.businessid || 0;
        this.srno = productcategory.srno || 0;
        this.picpath = productcategory.picpath || "";
        this.name = productcategory.name || "";
        this.imagecode = productcategory.imagecode || "";
       
    }
  }
  