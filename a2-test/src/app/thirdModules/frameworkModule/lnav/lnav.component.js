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
var FrameworkLNav = (function () {
    function FrameworkLNav() {
        this.scrollHeight = 20;
        this.wwjHeight = window.innerHeight - this.scrollHeight;
    }
    FrameworkLNav.prototype.onResize = function (event) {
        this.wwjHeight = event.target.innerHeight - this.scrollHeight;
    };
    __decorate([
        core_1.HostListener('window:resize', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], FrameworkLNav.prototype, "onResize", null);
    FrameworkLNav = __decorate([
        core_1.Component({
            moduleId: __filename,
            selector: "wwj-framework-lnav",
            templateUrl: "./lnav.component.html",
            styleUrls: ["./lnav.component.css"]
        }), 
        __metadata('design:paramtypes', [])
    ], FrameworkLNav);
    return FrameworkLNav;
}());
exports.FrameworkLNav = FrameworkLNav;
//# sourceMappingURL=lnav.component.js.map