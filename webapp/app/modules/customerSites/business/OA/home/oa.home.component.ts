import { Component } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: "tlr-oa-home",
    templateUrl: "./oa.home.component.html",
    styleUrls: ["./oa.home.component.css"]
})
export class OAHomeComponent {
    breadcrumbs: [OAModels.BreadcrumbItem];

    constructor(private router: Router) {
        this.router.events
            .map(event => event instanceof NavigationEnd)
            .subscribe(() => {
                this.breadcrumbs = null;
                this.setBreadCrumbs(this.router.url);
            });
    }

    private setBreadCrumbs(url: string): void {
        let urls: string[] = url.split("/");
        if (urls.length > 2) {
            let currentUrl = "/" + urls[1] + "/" + urls[2];
            for (let index = 3; index < urls.length; index++) {
                currentUrl += "/" + urls[index];
                let item: OAModels.BreadcrumbItem = { title: this.capticalString(urls[index]), state: currentUrl };
                if (!this.breadcrumbs) {
                    this.breadcrumbs = [item];
                }
                else {
                    this.breadcrumbs.push(item);
                }
            }
        }
    }

    private capticalString(value: string): string {
        return value[0].toUpperCase() + value.substring(1);
    }
}