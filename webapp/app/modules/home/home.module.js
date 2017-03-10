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
var service_module_1 = require("../../services/service.module");
var home_routing_module_1 = require("./router/home.routing.module");
var common_component_module_1 = require("../commonComponents/common.component.module");
var home_component_1 = require("./home.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var bussiness_component_1 = require("./bussiness/bussiness.component");
var store_component_1 = require("./store/store.component");
var contact_component_1 = require("./contact/contact.component");
var HomeModule = (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, common_1.CommonModule, router_1.RouterModule, service_module_1.ServiceModule, common_component_module_1.CommonComponentModule, home_routing_module_1.HomeRoutingModule],
            declarations: [home_component_1.HomeComponent, dashboard_component_1.DashboardComponent, bussiness_component_1.BussinessComponent, store_component_1.StoreComponent, contact_component_1.ContactComponent],
            exports: [home_component_1.HomeComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;
//# sourceMappingURL=home.module.js.map