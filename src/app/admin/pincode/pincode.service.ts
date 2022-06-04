import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Pincode } from "./pincode.model";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { ApiService } from "src/app/igap/service/api.service";
@Injectable()
export class PincodeService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<Pincode[]> = new BehaviorSubject<Pincode[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private api:ApiService) {
    super();
  }

  get data(): Pincode[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  list(): void {
    let formdata = {data:{}}
    this.api.post("igap/pincode/list", formdata).subscribe((result:any)=>{
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

  save(pincode: Pincode) {
    return this.api.post("igap/pincode/save", pincode);
  }
  
  delete(id: number): void {
    this.api.post("igap/pincode/delete", {id:id}).subscribe((result:any) => {
      if(result.data.status == "success")
        return true;
      else
        return false;
    });
  }
}
