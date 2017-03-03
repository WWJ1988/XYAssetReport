import { Component, HostListener } from "@angular/core";

@Component({
    moduleId: __filename,
    selector: "wwj-framework-lnav",
    templateUrl: "./lnav.component.html",
    styleUrls: ["./lnav.component.css"]
})
export class FrameworkLNav {
    private scrollHeight: number = 20;

    wwjHeight: number;
    constructor() {
        this.wwjHeight = window.innerHeight - this.scrollHeight;
    }
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.wwjHeight = event.target.innerHeight - this.scrollHeight;
    }
}