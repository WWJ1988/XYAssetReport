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
var routes = [
    {
        path: "oa",
        component: oa_component_1.OAComponent,
        children: [
            { path: "", redirectTo: "/oa/home", pathMatch: "full" },
            { path: "home", component: oa_home_component_1.OAHomeComponent }
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