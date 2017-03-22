"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var oa_component_1 = require("./oa.component");
var oa_home_component_1 = require("./home/oa.home.component");
var oa_login_component_1 = require("./login/oa-login.component");
var oa_logistic_component_1 = require("./logistic/oa.logistic.component");
var oa_order_component_1 = require("./order/oa.order.component");
var oa_personal_component_1 = require("./personal/oa.personal.component");
var oa_system_component_1 = require("./system/oa.system.component");
var oa_vehicle_component_1 = require("./vehicle/oa.vehicle.component");
var oa_order_n3demand_component_1 = require("./order/n3demand/oa.order.n3demand.component");
var oa_order_instant_component_1 = require("./order/instant/oa.order.instant.component");
var oa_order_finance_component_1 = require("./order/finance/oa.order.finance.component");
var routes = [
    {
        path: "oa",
        component: oa_component_1.OAComponent,
        children: [
            { path: "", redirectTo: "/oa/login", pathMatch: "full" },
            { path: "login", component: oa_login_component_1.OALoginComponent },
            {
                path: "home",
                component: oa_home_component_1.OAHomeComponent,
                children: [
                    {
                        path: "order",
                        component: oa_order_component_1.OAOrderComponent,
                        children: [
                            { path: "", redirectTo: "/oa/home/order/n3demand", pathMatch: "full" },
                            { path: "n3demand", component: oa_order_n3demand_component_1.OAOrderN3demandComponent },
                            { path: "instant", component: oa_order_instant_component_1.OAOrderInstantComponent },
                            { path: "finance", component: oa_order_finance_component_1.OAOrderFinanceComponent }
                        ]
                    },
                    { path: "logistic", component: oa_logistic_component_1.OALogisticComponent },
                    { path: "vehicle", component: oa_vehicle_component_1.OAVehicleComponent },
                    { path: "system", component: oa_system_component_1.OASystemComponent },
                    { path: "personal", component: oa_personal_component_1.OAPersonalComponent },
                    { path: "", redirectTo: "/oa/home/order", pathMatch: "full" }
                ]
            }
        ]
    }
];
var OARoutingModule = (function () {
    function OARoutingModule() {
    }
    OARoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], OARoutingModule);
    return OARoutingModule;
}());
exports.OARoutingModule = OARoutingModule;
//# sourceMappingURL=oa.routing.js.map