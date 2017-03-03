/// <reference path="../../index.d.ts" />
import { Component, Input } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "wwj-lrnav",
    templateUrl: "./lrNav.component.html",
    styleUrls: ["./lrNav.component.css"]
})
export class LRNavComponent {
    @Input()
    items: any;
}