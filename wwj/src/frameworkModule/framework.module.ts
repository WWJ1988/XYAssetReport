import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FrameworkLbar } from "./lbar/lbar.component";
import { FrameworkRbar } from "./rbar/rbar.component";
import { FrameworkLRbar } from "./lrbar/lrbar.component";
import { FrameworkLNav } from "./lnav/lnav.component";

@NgModule({
    imports: [CommonModule],
    declarations: [FrameworkLbar, FrameworkRbar, FrameworkLRbar, FrameworkLNav],
    exports: [FrameworkLbar, FrameworkRbar, FrameworkLRbar, FrameworkLNav]
})
export class WwjFrameworkModule {

}