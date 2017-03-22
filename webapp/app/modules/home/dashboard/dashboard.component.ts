import { Component } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "tlr-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent {
    imageCards: Models.ImageCard[] = [
        {
            ImageUrl: "app/sheets/imgs/img1.jpg",
            State: "/oa",
            Title: "背景图片",
            Description: "测试，背景图片"
        },
        {
            ImageUrl: "app/sheets/imgs/img1.jpg",
            State: "/daikuan",
            Title: "背景图片",
            Description: "测试，背景图片"
        }
    ];
}