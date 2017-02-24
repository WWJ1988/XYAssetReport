import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import 'rxjs/add/operator/switchMap';

import { Blog } from "../models/Blog";
import { DataService } from "../services/data.service";

@Component({
    moduleId: module.id,
    selector: "my-blog-detail",
    templateUrl: "../../views/blogDetail.component.html"
})
export class BlogDetailComponent implements OnInit {
    blog: Blog;
    constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private location: Location) { }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.dataService.getBlogById(+params["id"]))
            .subscribe(blog => this.blog = blog);
    }
}