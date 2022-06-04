import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { City } from "./city.model";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { ApiService } from "src/app/igap/service/api.service";

@Injectable()

export class CityService  extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<City[]> = new BehaviorSubject<City[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private api:ApiService) {
    super();
  }

  get data(): City[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  list(stateid): void {
    let formdata = {stateid:stateid};
    console.log(formdata);
    this.api.post("shared/city/list", formdata).subscribe((result:any)=>{
      if(result.data.status == "success"){
        this.isTblLoading = false;
        this.dataChange.next(result.data.data);
      }
      else{
        this.isTblLoading = false;
      }
    });
  }

  save(city: City) {
    return this.api.post("shared/city/save", city);
  }
  
  delete(id: number): void {
    this.api.post("shared/city/delete", {id:id}).subscribe((result:any) => {
      if(result.data.status == "success")
        return true;
      else
        return false;
    });
  }
}
