import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { Productcategory } from "../../../productcategory.model";
import { ProductcategoryService } from "../../../productcategory.service";
import { ApiService } from "src/app/igap/service/api.service";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  productcategoriesForm: FormGroup;
  productcategories: Productcategory;
  image = "";

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public productcategoriesService: ProductcategoryService,
    private api:ApiService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    
    
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.productcategories.name;
      this.productcategories = data.productcategories;
    } else {
      this.dialogTitle = "New Product Category";
      this.productcategories = new Productcategory({});
    }
    this.productcategoriesForm = this.createContactForm();
  }

  formControl = new FormControl("", [Validators.required]);

  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.productcategories.id],
      businessid: [localStorage.getItem("userid")],
      srno: [this.productcategories.srno],
      imagecode: [""],
      name: [this.productcategories.name]      
    });
  }

  submit(formdata:Productcategory) {
    formdata.imagecode = this.image;
    console.log(formdata);
    this.productcategoriesService.save(formdata).subscribe((result:any)=>{
      if(result.data.status == "success")
      {
        this.showNotification(
          "snackbar-success",
          "Successful",
          "bottom",
          "center"
        );
        this.dialogRef.close();
      }
      else{
        this.showNotification(
          "snackbar-error",
          "Failed - " + result.data.message,
          "bottom",
          "center"
        );
      }
    });
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }  

  handleUpload(event:any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>{
      if(reader.result != null)
      {
        this.image = reader.result.toString();
      }
    }
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
