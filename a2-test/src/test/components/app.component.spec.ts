import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import {APP_BASE_HREF} from '@angular/common';

import { Blog } from "../../app/models/Blog";

import { AppRoutingModule } from "../../app/routers/app.routing.module";
import { AppComponent } from "../../app/components/app.component";
import { HomeComponent } from "../../app/components/home.component";
import { LearnComponent } from "../../app/components/learn.component";
import { LifeComponent } from "../../app/components/life.component";
import { MessageComponent } from "../../app/components/message.component";
import { WidgetComponent } from "../../app/components/commonComponents/widget.component";
import { BlogSummaryComponent } from "../../app/components/commonComponents/blogSummary.component";
import { BlogDetailComponent } from "../../app/components/blogDetail.component";

import { DataService } from "../../app/services/data.service";

describe("app.component", () => {
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let debEle: DebugElement;
    let ele: HTMLElement;
    let dataService: DataService = {
        getBlog(): blogModels.IBlog {
            return {
                id: 2,
                title: "Second Blog",
                content: "This is my Second blog",
                summary: "Second blog...",
                author: "neil",
                date: new Date(),
                type: 1
            };
        },
        getBlogs(): Blog[] {
            return [{
                id: 2,
                title: "Second Blog",
                content: "This is my Second blog",
                summary: "Second blog...",
                author: "neil",
                date: new Date()
            }];
        },
        getBlogById(id: number, type: number): Promise<Blog> {
            return Promise.resolve({
                id: 2,
                title: "Second Blog",
                content: "This is my Second blog",
                summary: "Second blog...",
                author: "neil",
                date: new Date()
            });
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AppRoutingModule],
            declarations: [AppComponent, HomeComponent, LearnComponent, LifeComponent, MessageComponent, WidgetComponent, BlogSummaryComponent, BlogDetailComponent],
            providers: [{ provide: DataService, useValue: dataService },{ provide: APP_BASE_HREF, useValue: "/" }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);

        comp = fixture.componentInstance;

        debEle = fixture.debugElement.query(By.css("h1"));
        ele = debEle.nativeElement;
    });

    it("title", () => {
        //通知Angular执行变化检测
        fixture.detectChanges();
        expect(ele.innerText).toBe("春暖花开");
    });
});