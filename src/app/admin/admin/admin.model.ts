export class Admin {
  id: number;
  name: string;
  username: string;
  password: string;
  firebaseid: string;

  constructor(admin) {
      this.id = admin.id || 0;
      this.name = admin.name || "";
      this.username = admin.username || "";
      this.password = admin.password || "";
      this.firebaseid = admin.firebaseid || "";
  }
}
