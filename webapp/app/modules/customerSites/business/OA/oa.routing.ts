import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

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

const routes: Routes = [
    {
        path: "oa",
        component: OAComponent,
        children: [
            { path: "", redirectTo: "/oa/login", pathMatch: "full" },
            { path: "login", component: OALoginComponent },
            {
                path: "home",
                component: OAHomeComponent,
                children: [
                    {
                        path: "order",
                        component: OAOrderComponent,
                        children: [
                            { path: "", redirectTo: "/oa/home/order/n3demand", pathMatch: "full" },
                            { path: "n3demand", component: OAOrderN3demandComponent },
                            { path: "instant", component: OAOrderInstantComponent },
                            { path: "finance", component: OAOrderFinanceComponent }
                        ]
                    },
                    { path: "logistic", component: OALogisticComponent },
                    { path: "vehicle", component: OAVehicleComponent },
                    { path: "system", component: OASystemComponent },
                    { path: "personal", component: OAPersonalComponent },
                    { path: "", redirectTo: "/oa/home/order", pathMatch: "full" }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OARoutingModule { }