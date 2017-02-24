import { Component, Input } from "@angular/core";
import { Blog } from "../../models/Blog";

@Component({
    moduleId: module.id,
    selector: "my-blog",
    templateUrl: "../../../views/commonComponentViews/blogSummary.component.html"
})
export class BlogSummaryComponent {
    @Input()
    blog: Blog;
}