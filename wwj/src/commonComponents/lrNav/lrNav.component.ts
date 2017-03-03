import { Component, Input } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "wwj-lrnav",
    templateUrl: "./lrNav.component.html"
})
export class LRNavComponent {
    @Input()
    items: WwjModels.LRNav;
}