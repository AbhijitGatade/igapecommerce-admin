import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RightSidebarService } from "./service/rightsidebar.service";
import { DynamicScriptLoaderService } from "./service/dynamic-script-loader.service";
import { throwIfAlreadyLoaded } from "./guard/module-import.guard";
import { DirectionService } from "./service/direction.service";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    RightSidebarService,
    DynamicScriptLoaderService,
    DirectionService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, "CoreModule");
  }
}
