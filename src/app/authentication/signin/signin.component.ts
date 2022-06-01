import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { ApiService } from "src/app/igap/service/api.service";
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent  extends UnsubscribeOnDestroyAdapter  implements OnInit{
  authForm: FormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api:ApiService
  ) {
    super();
  }

  ngOnInit() {

    this.authForm = this.formBuilder.group({
      email: ["admin", Validators.required],
      password: ["admin", Validators.required],
    });
  }

  onSubmit(formdata:any) {
    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.authForm.invalid) {
      this.error = "Username and Password not valid !";
      return;
    }
    else {
      this.api.post("igap/authentication/login", formdata).subscribe((result:any)=>{
        if(result.data.status == "success")
        {
          setTimeout(() => {
            const role = result.data.role;
            localStorage.setItem("role", role);
            localStorage.setItem("userid", result.data.data[0].id);
            localStorage.setItem("name", result.data.data[0].name);
            if (role === "admin") {
              this.router.navigate(["/admin/dashboard"]);
            } else if (role === "vendor") {
              this.router.navigate(["/vendor/dashboard"]);
            } else if (role === "business") {
              this.router.navigate(["/business/dashboard"]);
            } else {
              this.router.navigate(["/authentication/signin"]);
            }
            this.loading = false;
          }, 1000);
        }
        else{
          this.error = "Invalid login";
          this.submitted = false;
          this.loading = false;
        }
      });
    }
  }
}
