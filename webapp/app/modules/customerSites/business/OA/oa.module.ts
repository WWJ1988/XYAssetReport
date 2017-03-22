import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { OARoutingModule } from "./oa.routing";

import { OAComponent } from "./oa.component";
import { OAHomeComponent } from "./home/oa.home.component";
import { OALoginComponent } from "./login/oa-login.component";
import { OALogisticComponent } from "./logistic/oa.logistic.component";
import { OAOrderComponent } from "./order/oa.order.component";
import { OAPersonalComponent } from "./personal/oa.personal.component";
import { OASystemComponent } from "./system/oa.system.component";
import { OAVehicleComponent } from "./vehicle/oa.vehicle.component";
import { OAOrderN3demandComponent } from "./order/n3demand/oa.order.n3demand.component";
import { OAOrderInstantComponent } from "./order/instant/oa.order.instant.component";
import { OAOrderFinanceComponent } from "./order/finance/oa.order.finance.component";

@NgModule({
    imports: [BrowserModule, FormsModule, CommonModule, RouterModule, OARoutingModule],
    declarations: [OAComponent, OAHomeComponent, OALoginComponent, OALogisticComponent, OAOrderComponent, OAPersonalComponent,
        OASystemComponent, OAVehicleComponent, OAOrderN3demandComponent, OAOrderInstantComponent, OAOrderFinanceComponent],
    exports: [OAComponent]
})
export class OAModule { }