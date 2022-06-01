import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Business } from "./business.model";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { ApiService } from "src/app/igap/service/api.service";
@Injectable()
export class BusinessService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<Business[]> = new BehaviorSubject<Business[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private api:ApiService) {
    super();
  }

  get data(): Business[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  list(): void {
    let formdata = {data:{}}
    this.api.post("igap/business/list", formdata).subscribe((result:any)=>{
      if(result.data.status == "success"){
        this.isTblLoading = false;
        this.dataChange.next(result.data.data);
        console.log(result.data.data);
      }
      else{
        this.isTblLoading = false;
      }
    });
  }

  save(business: Business) {
    return this.api.post("igap/business/save", business);
  }
  
  delete(id: number): void {
    this.api.post("igap/business/delete", {id:id}).subscribe((result:any) => {
      if(result.data.status == "success")
        return true;
      else
        return false;
    });
  }
}
