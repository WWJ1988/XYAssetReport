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
var common_1 = require("@angular/common");
var lbar_component_1 = require("./lbar/lbar.component");
var rbar_component_1 = require("./rbar/rbar.component");
var lrbar_component_1 = require("./lrbar/lrbar.component");
var lnav_component_1 = require("./lnav/lnav.component");
var FrameworkModule = (function () {
    function FrameworkModule() {
    }
    FrameworkModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [lbar_component_1.FrameworkLbar, rbar_component_1.FrameworkRbar, lrbar_component_1.FrameworkLRbar, lnav_component_1.FrameworkLNav],
            exports: [lbar_component_1.FrameworkLbar, rbar_component_1.FrameworkRbar, lrbar_component_1.FrameworkLRbar, lnav_component_1.FrameworkLNav]
        }), 
        __metadata('design:paramtypes', [])
    ], FrameworkModule);
    return FrameworkModule;
}());
exports.FrameworkModule = FrameworkModule;
//# sourceMappingURL=framework.module.js.map