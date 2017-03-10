import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { OARoutingModule } from "./oa.routing";

import { OAComponent } from "./oa.component";
import { OAHomeComponent } from "./home/oa.home.component";

@NgModule({
    imports: [BrowserModule, FormsModule, CommonModule, RouterModule, OARoutingModule],
    declarations: [OAComponent, OAHomeComponent],
    exports: [OAComponent]
})
export class OAModule { }