import { NgModule } from "@angular/core";

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { WidgetComponent } from "./widget/widget.component";
import { ImageCardComponent } from "./imageCard/image-card.component";

@NgModule({
    imports: [BrowserModule, FormsModule, CommonModule, RouterModule],
    declarations: [WidgetComponent, ImageCardComponent],
    exports: [WidgetComponent, ImageCardComponent]
})
export class CommonComponentModule {

}