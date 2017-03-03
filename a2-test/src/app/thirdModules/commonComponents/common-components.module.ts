import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { LRNavComponent } from "./lrNav/lrNav.component";

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [LRNavComponent],
    exports: [LRNavComponent]
})
export class WwjCommonComponentsModule {

}