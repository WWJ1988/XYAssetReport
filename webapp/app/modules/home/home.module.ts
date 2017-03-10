import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { ServiceModule } from "../../services/service.module";
import { HomeRoutingModule } from "./router/home.routing.module";
import { CommonComponentModule } from "../commonComponents/common.component.module";

import { HomeComponent } from "./home.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BussinessComponent } from "./bussiness/bussiness.component";
import { StoreComponent } from "./store/store.component";
import { ContactComponent } from "./contact/contact.component";

@NgModule({
    imports: [BrowserModule, FormsModule, CommonModule, RouterModule, ServiceModule, CommonComponentModule, HomeRoutingModule],
    declarations: [HomeComponent, DashboardComponent, BussinessComponent, StoreComponent, ContactComponent],
    exports: [HomeComponent]
})
export class HomeModule { }