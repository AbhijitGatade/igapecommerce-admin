import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { Banner } from "../../../banner.model";
import { BannerService } from "../../../banner.service";
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
  bannerForm: FormGroup;
  banner: Banner;
  image = "";

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public bannerService: BannerService,
    private api:ApiService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    
    
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.banner.name;
      this.banner = data.banner;
    } else {
      this.dialogTitle = "New Banner";
      this.banner = new Banner({});
    }
    this.bannerForm = this.createContactForm();

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
      id: [this.banner.id],
      businessid: localStorage.getItem("userid"),
      title: [this.banner.title],
      imagecode: [""],
      link: [this.banner.link],
      srno: [this.banner.srno],
    });
  }

  submit(formdata:Banner) {
    formdata.imagecode = this.image;
    this.bannerService.save(formdata).subscribe((result:any)=>{
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