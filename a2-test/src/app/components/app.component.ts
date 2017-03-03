/// <reference path="../thirdmodules/index.d.ts" />
import { Component } from "@angular/core";

@Component({
    moduleId: __filename,
    //moduleId: module.id,
    selector: "my-app",
    //template:"<router-outlet></router-outlet>",
    templateUrl: "../../views/app.component.html"
})
export class AppComponent {
    navItems: WwjModels.LRNav;
    constructor() {
        this.navItems = {
            leftItems: [
                { title: "首页", state: "home" },
                { title: "学习", state: "learn" },
                { title: "生活", state: "life" },
                { title: "留言", state: "message" }
            ],
            rightItems: [
                { title: "首页", state: "home" },
                { title: "学习", state: "learn" },
                { title: "生活", state: "life" },
                { title: "留言", state: "message" }
            ]
        };
    }
}