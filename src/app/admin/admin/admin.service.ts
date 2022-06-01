import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Admin } from "./admin.model";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { ApiService } from "src/app/igap/service/api.service";
@Injectable()
export class AdminService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<Admin[]> = new BehaviorSubject<Admin[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private api:ApiService) {
    super();
  }

  get data(): Admin[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  list(): void {
    let formdata = {data:{}}
    this.api.post("igap/admin/list", formdata).subscribe((result:any)=>{
      if(result.data.status == "success"){
        this.isTblLoading = false;
        this.dataChange.next(result.data.data);
      }
      else{
        this.isTblLoading = false;
      }
    });
  }

  save(admin: Admin) {
    return this.api.post("igap/admin/save", admin);
  }
  
  delete(id: number): void {
    this.api.post("igap/admin/delete", {id:id}).subscribe((result:any) => {
      if(result.data.status == "success")
        return true;
      else
        return false;
    });
  }
}
