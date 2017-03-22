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
var OAHomeComponent = (function () {
    function OAHomeComponent(router) {
        var _this = this;
        this.router = router;
        this.router.events
            .map(function (event) { return event instanceof router_1.NavigationEnd; })
            .subscribe(function () {
            _this.breadcrumbs = null;
            _this.setBreadCrumbs(_this.router.url);
        });
    }
    OAHomeComponent.prototype.setBreadCrumbs = function (url) {
        var urls = url.split("/");
        if (urls.length > 2) {
            var currentUrl = "/" + urls[1] + "/" + urls[2];
            for (var index = 3; index < urls.length; index++) {
                currentUrl += "/" + urls[index];
                var item = { title: this.capticalString(urls[index]), state: currentUrl };
                if (!this.breadcrumbs) {
                    this.breadcrumbs = [item];
                }
                else {
                    this.breadcrumbs.push(item);
                }
            }
        }
    };
    OAHomeComponent.prototype.capticalString = function (value) {
        return value[0].toUpperCase() + value.substring(1);
    };
    OAHomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "tlr-oa-home",
            templateUrl: "./oa.home.component.html",
            styleUrls: ["./oa.home.component.css"]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], OAHomeComponent);
    return OAHomeComponent;
}());
exports.OAHomeComponent = OAHomeComponent;
//# sourceMappingURL=oa.home.component.js.map