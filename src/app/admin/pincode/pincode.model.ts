export class Pincode {
    id: number;
    pincode: string;
    stateid: number;
    districtid: number;
    
    constructor(object) {
        this.id = object.id || 0;
        this.pincode = object.pincode || "";
        this.stateid = object.stateid || 0;
        this.districtid = object.districtid || 0;
    }
  }
  