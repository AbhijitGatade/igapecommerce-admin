import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "dashboard",
    component:DashboardComponent
  },
  {
    path: "states",
    loadChildren: () =>
      import("./state/state.module").then((m) => m.StateModule),
  },
  {
    path: "districts/:stateid",
    loadChildren: () =>
      import("./district/district.module").then((m) => m.DistrictModule),
  },
  {
    path: "cities",
    loadChildren: () =>
      import("./city/city.module").then((m) => m.CityModule),
  },
  {
    path: "admins",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
  },
  {
    path: "vendors",
    loadChildren: () =>
      import("./vendor/vendor.module").then((m) => m.VendorModule),
  },
  {
    path: "businesses",
    loadChildren: () =>
      import("./business/business.module").then((m) => m.BusinessModule),
  },
  {
    path: "productcategories",
    loadChildren: () =>
      import("./productcategory/productcategory.module").then((m) => m.ProductcategoryModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
