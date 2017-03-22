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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var oa_routing_1 = require("./oa.routing");
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
var OAModule = (function () {
    function OAModule() {
    }
    OAModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, common_1.CommonModule, router_1.RouterModule, oa_routing_1.OARoutingModule],
            declarations: [oa_component_1.OAComponent, oa_home_component_1.OAHomeComponent, oa_login_component_1.OALoginComponent, oa_logistic_component_1.OALogisticComponent, oa_order_component_1.OAOrderComponent, oa_personal_component_1.OAPersonalComponent,
                oa_system_component_1.OASystemComponent, oa_vehicle_component_1.OAVehicleComponent, oa_order_n3demand_component_1.OAOrderN3demandComponent, oa_order_instant_component_1.OAOrderInstantComponent, oa_order_finance_component_1.OAOrderFinanceComponent],
            exports: [oa_component_1.OAComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], OAModule);
    return OAModule;
}());
exports.OAModule = OAModule;
//# sourceMappingURL=oa.module.js.map