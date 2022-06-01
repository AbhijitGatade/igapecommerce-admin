import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { District } from "./district.model";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { ApiService } from "src/app/igap/service/api.service";

@Injectable()

export class DistrictService  extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<District[]> = new BehaviorSubject<District[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private api:ApiService) {
    super();
  }

  get data(): District[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  list(stateid): void {
    let formdata = {stateid:stateid};
    console.log(formdata);
    this.api.post("shared/district/list", formdata).subscribe((result:any)=>{
      if(result.data.status == "success"){
        this.isTblLoading = false;
        this.dataChange.next(result.data.data);
      }
      else{
        this.isTblLoading = false;
      }
    });
  }

  save(district: District) {
    return this.api.post("shared/district/save", district);
  }
  
  delete(id: number): void {
    this.api.post("shared/district/delete", {id:id}).subscribe((result:any) => {
      if(result.data.status == "success")
        return true;
      else
        return false;
    });
  }
}
