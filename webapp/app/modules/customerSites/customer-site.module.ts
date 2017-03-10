import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { CustomerSideBusinessModule } from "./business/business.module";

@NgModule({
    imports: [BrowserModule, FormsModule, CommonModule, RouterModule, CustomerSideBusinessModule]
})
export class CustomerSideModule { }