import { Component, Input } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "my-widget",
    templateUrl: "../../../views/commonComponentViews/widget.component.html"
})
export class WidgetComponent {
    @Input()
    myWidth: number;
    myHeight: number;
    myClass: string;
}