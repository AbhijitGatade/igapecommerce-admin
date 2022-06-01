export class Blog {
    id: number;
    businessid: number;
    categoryid: number;
    title: any;
    urltitle: any;
    createdon: string;
    author: string;
    imagecode: string;
    body: string;    
    status: any;
  
    constructor(blog) {
        this.id = blog.id || 0;
        this.businessid = blog.businessid || 0;
        this.categoryid = blog.categoryid || 0;
        this.title=  blog.title || "";
        this.urltitle=  blog.urltitle || "";
        this.createdon = blog.createdon || "";
        this.author = blog.author || "";
        this.imagecode = blog.picpath || "";
        this.body = blog.body || "";
        this.status= blog.status ||"";
    }
  }