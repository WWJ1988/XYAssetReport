import { Component, Input } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "tlr-image-card",
    templateUrl: "./image-card.component.html",
    styleUrls: ["./image-card.component.css"]
})
export class ImageCardComponent {
    @Input() imageCard: Models.ImageCard;

    constructor() {
    }
}