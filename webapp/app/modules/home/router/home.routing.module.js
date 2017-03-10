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
var home_component_1 = require("../home.component");
var dashboard_component_1 = require("../dashboard/dashboard.component");
var bussiness_component_1 = require("../bussiness/bussiness.component");
var store_component_1 = require("../store/store.component");
var contact_component_1 = require("../contact/contact.component");
var routes = [
    {
        path: 'home',
        component: home_component_1.HomeComponent,
        children: [
            { path: "homedashboard", component: dashboard_component_1.DashboardComponent },
            { path: "homebussiness", component: bussiness_component_1.BussinessComponent },
            { path: "homestore", component: store_component_1.StoreComponent },
            { path: "homecontact", component: contact_component_1.ContactComponent },
            { path: "", component: dashboard_component_1.DashboardComponent }
        ]
    }
];
var HomeRoutingModule = (function () {
    function HomeRoutingModule() {
    }
    HomeRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeRoutingModule);
    return HomeRoutingModule;
}());
exports.HomeRoutingModule = HomeRoutingModule;
//# sourceMappingURL=home.routing.module.js.map