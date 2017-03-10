import { Component, Input } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "tlr-image-card",
    templateUrl: "./image-card.component.html",
    styleUrls: ["./image-card.component.css"]
})
export class ImageCardComponent {
    @Input()
    imageCard: Models.ImageCard;

    constructor() {
        this.imageCard = {
            ImageUrl: "app/sheets/imgs/img1.jpg",
            State:"/oa",
            Title: "背景图片",
            Description: "测试，背景图片"
        };
    }
}