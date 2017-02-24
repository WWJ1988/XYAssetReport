import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from "../routers/app.routing.module";

import { AppComponent } from "../components/app.component";
import { HomeComponent } from "../components/home.component";
import { LearnComponent } from "../components/learn.component";
import { LifeComponent } from "../components/life.component";
import { MessageComponent } from "../components/message.component";
import { WidgetComponent } from "../components/commonComponents/widget.component";
import { BlogSummaryComponent } from "../components/commonComponents/blogSummary.component";
import { BlogDetailComponent } from "../components/blogDetail.component";

import { DataService } from "../services/data.service";

@NgModule({
    imports: [BrowserModule, FormsModule, AppRoutingModule],
    declarations: [AppComponent, HomeComponent, LearnComponent, LifeComponent, MessageComponent, WidgetComponent, BlogSummaryComponent, BlogDetailComponent],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {

}