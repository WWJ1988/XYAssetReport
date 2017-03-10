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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var widget_component_1 = require("./widget/widget.component");
var image_card_component_1 = require("./imageCard/image-card.component");
var CommonComponentModule = (function () {
    function CommonComponentModule() {
    }
    CommonComponentModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, common_1.CommonModule, router_1.RouterModule],
            declarations: [widget_component_1.WidgetComponent, image_card_component_1.ImageCardComponent],
            exports: [widget_component_1.WidgetComponent, image_card_component_1.ImageCardComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], CommonComponentModule);
    return CommonComponentModule;
}());
exports.CommonComponentModule = CommonComponentModule;
//# sourceMappingURL=common.component.module.js.map