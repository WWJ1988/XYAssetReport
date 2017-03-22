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
var ng2_bootstrap_1 = require("ng2-bootstrap");
var daikuan_routing_1 = require("./daikuan.routing");
var common_component_module_1 = require("../../../commonComponents/common.component.module");
var daikuan_component_1 = require("./daikuan.component");
var daikuan_new_component_1 = require("./new/daikuan-new.component");
var brandwidget_component_1 = require("./new/brandwidget/brandwidget.component");
var dataService_1 = require("./services/dataService");
var DaikuanModule = (function () {
    function DaikuanModule() {
    }
    DaikuanModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, common_1.CommonModule, router_1.RouterModule, daikuan_routing_1.DaikuanRoutingModule, ng2_bootstrap_1.CarouselModule.forRoot(), common_component_module_1.CommonComponentModule],
            declarations: [daikuan_component_1.DaiKuanComponent, daikuan_new_component_1.DaiKuanNewComponent, brandwidget_component_1.BrandWidgetComponent],
            exports: [daikuan_component_1.DaiKuanComponent],
            providers: [dataService_1.DaikuanDataService]
        }), 
        __metadata('design:paramtypes', [])
    ], DaikuanModule);
    return DaikuanModule;
}());
exports.DaikuanModule = DaikuanModule;
//# sourceMappingURL=daikuan.module.js.map