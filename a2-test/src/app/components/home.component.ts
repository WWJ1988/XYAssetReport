import { Component, OnInit } from "@angular/core";
import { DataService } from "../services/data.service";
import { Blog } from "../models/Blog";

@Component({
    moduleId: module.id,
    selector: "my-home",
    templateUrl: "../../views/home.component.html"
})
export class HomeComponent implements OnInit {
    blogs: Blog[];
    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        this.blogs = this.dataService.getBlogs();
    }
}