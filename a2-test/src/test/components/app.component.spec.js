"use strict";
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var common_1 = require('@angular/common');
var app_routing_module_1 = require("../../app/routers/app.routing.module");
var app_component_1 = require("../../app/components/app.component");
var home_component_1 = require("../../app/components/home.component");
var learn_component_1 = require("../../app/components/learn.component");
var life_component_1 = require("../../app/components/life.component");
var message_component_1 = require("../../app/components/message.component");
var widget_component_1 = require("../../app/components/commonComponents/widget.component");
var blogSummary_component_1 = require("../../app/components/commonComponents/blogSummary.component");
var blogDetail_component_1 = require("../../app/components/blogDetail.component");
var data_service_1 = require("../../app/services/data.service");
describe("app.component", function () {
    var comp;
    var fixture;
    var debEle;
    var ele;
    var dataService = {
        getBlog: function () {
            return {
                id: 2,
                title: "Second Blog",
                content: "This is my Second blog",
                summary: "Second blog...",
                author: "neil",
                date: new Date(),
                type: 1
            };
        },
        getBlogs: function () {
            return [{
                    id: 2,
                    title: "Second Blog",
                    content: "This is my Second blog",
                    summary: "Second blog...",
                    author: "neil",
                    date: new Date()
                }];
        },
        getBlogById: function (id, type) {
            return Promise.resolve({
                id: 2,
                title: "Second Blog",
                content: "This is my Second blog",
                summary: "Second blog...",
                author: "neil",
                date: new Date()
            });
        }
    };
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [app_routing_module_1.AppRoutingModule],
            declarations: [app_component_1.AppComponent, home_component_1.HomeComponent, learn_component_1.LearnComponent, life_component_1.LifeComponent, message_component_1.MessageComponent, widget_component_1.WidgetComponent, blogSummary_component_1.BlogSummaryComponent, blogDetail_component_1.BlogDetailComponent],
            providers: [{ provide: data_service_1.DataService, useValue: dataService }, { provide: common_1.APP_BASE_HREF, useValue: "/" }]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        comp = fixture.componentInstance;
        debEle = fixture.debugElement.query(platform_browser_1.By.css("h1"));
        ele = debEle.nativeElement;
    });
    it("title", function () {
        //通知Angular执行变化检测
        fixture.detectChanges();
        expect(ele.innerText).toBe("春暖花开");
    });
});
//# sourceMappingURL=app.component.spec.js.map