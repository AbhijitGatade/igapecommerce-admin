import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "dashboard",
    component:DashboardComponent
  },
  {
    path: "banners",
    loadChildren: () =>
      import("./banner/banner.module").then((m) => m.BannerModule),
  },
  {
    path: "blogcategories",
    loadChildren: () =>
      import("./blogcategory/blogcategory.module").then((m) => m.BlogcategoryModule),
  },
  {
    path: "blogs",
    loadChildren: () =>
      import("./blog/blog.module").then((m) => m.BlogModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessRoutingModule {}
