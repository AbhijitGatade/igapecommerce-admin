import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { Blog } from "../../../blog.model";
import { BlogService } from "../../../blog.service";
import { ApiService } from "src/app/igap/service/api.service";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent {
  public Editor = ClassicEditor;
  action: string;
  dialogTitle: string;
  blogForm: FormGroup;
  blog: Blog;
  categories:any;
  image = "";

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public blogService: BlogService,
    private api:ApiService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    
    let formdata = {businessid:localStorage.getItem("userid")}
    this.api.post("business/blogcategory/list", formdata).subscribe((result:any)=>{      
      console.log(result.data);
      this.categories = result.data.data;
    });
    
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.blog.name;
      this.blog = data.blog;
    } else {
      this.dialogTitle = "New Blog";
      this.blog = new Blog({});
    }
    this.blogForm = this.createContactForm();

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
      id: [this.blog.id],
      businessid: [localStorage.getItem("userid")],
      categoryid: [this.blog.categoryid],
      title: [this.blog.title],
      urltitle: [this.blog.urltitle],
      createdon: [this.blog.createdon],
      author: [this.blog.author],
      imagecode: [""],
      body: [this.blog.body],
    });
  }

  submit(formdata:Blog) {
    formdata.imagecode = this.image;
    this.blogService.save(formdata).subscribe((result:any)=>{
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
  
  onNoClick(): void {
    this.dialogRef.close();
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