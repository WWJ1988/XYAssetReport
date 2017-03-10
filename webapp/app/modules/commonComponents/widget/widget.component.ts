import { Component, Input } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "tlr-widget",
    templateUrl: "./widget.component.html",
    styleUrls: ["./widget.component.css"]
})
export class WidgetComponent {
    @Input()
    myClass: string;
    @Input()
    hasTitle: boolean = true;
}