export class Vendor {
  id: number;
  name: string;
  email: string;
  password: string;
  mobileno: string;
  address: string;
  cityid: number;
  pincode: string;

  constructor(vendor) {
      this.id = vendor.id || 0;
      this.name = vendor.name || "";
      this.email = vendor.email || "";
      this.password = vendor.password || "";
      this.mobileno = vendor.mobileno || "";
      this.address = vendor.address || "";
      this.cityid = vendor.cityid || 0;
      this.pincode = vendor.pincode || "";
  }
}
