import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { CarouselModule } from "ng2-bootstrap";

import { DaikuanRoutingModule } from "./daikuan.routing";
import { CommonComponentModule } from "../../../commonComponents/common.component.module";

import { DaiKuanComponent } from "./daikuan.component";
import { DaiKuanNewComponent } from "./new/daikuan-new.component";
import { BrandWidgetComponent } from "./new/brandwidget/brandwidget.component";

import { DaikuanDataService } from "./services/dataService";

@NgModule({
    imports: [BrowserModule, FormsModule, CommonModule, RouterModule, DaikuanRoutingModule, CarouselModule.forRoot(), CommonComponentModule],
    declarations: [DaiKuanComponent, DaiKuanNewComponent, BrandWidgetComponent],
    exports: [DaiKuanComponent],
    providers: [DaikuanDataService]
})
export class DaikuanModule { }