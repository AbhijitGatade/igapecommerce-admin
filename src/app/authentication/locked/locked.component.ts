import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-locked",
  templateUrl: "./locked.component.html",
  styleUrls: ["./locked.component.scss"],
})
export class LockedComponent implements OnInit {
  authForm: FormGroup;
  submitted = false;
  userImg: string;
  userFullName: string;
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      password: ["", Validators.required],
    });
    this.userImg = "";//this.authService.currentUserValue.img;
    this.userFullName = localStorage.getItem("name");
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    } else {
      const role = localStorage.getItem("role");
      if (role === "admin") {
        this.router.navigate(["/admin/dashboard/main"]);
      } else if (role === "vendor") {
        this.router.navigate(["/vendor/dashboard"]);
      } else if (role === "business") {
        this.router.navigate(["/business/dashboard"]);
      } else {
        this.router.navigate(["/authentication/signin"]);
      }
    }
  }
}
