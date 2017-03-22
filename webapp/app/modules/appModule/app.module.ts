import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { UrlHandlingStrategy } from "@angular/router";

import { CommonComponentModule } from "../commonComponents/common.component.module";
import { HomeModule } from "../home/home.module";
import { CustomerSideModule } from "../customerSites/customer-site.module";
import { AppRoutingModule } from "./app.routing.module";

import { AppComponent } from "./app.component";

@NgModule({
    imports: [BrowserModule, FormsModule, CommonModule, CommonComponentModule, HomeModule, CustomerSideModule, AppRoutingModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {

}