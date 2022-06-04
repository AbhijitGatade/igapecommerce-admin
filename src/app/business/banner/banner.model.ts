export class Banner {
    id: number;
    businessid: number;
    title: string;
    imagecode: string;
    link: string;
    srno:number;
  
    constructor(banner) {
        this.id = banner.id || 0;
        this.businessid = banner.businessid || 0;
        this.title = banner.title || "";
        this.imagecode = banner.imagecode || "";
        this.link = banner.link || "";
        this.srno = banner.srno || 0;
    }
  }
  