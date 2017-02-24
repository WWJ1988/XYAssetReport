import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "../components/home.component";
import { LearnComponent } from "../components/learn.component";
import { LifeComponent } from "../components/life.component";
import { MessageComponent } from "../components/message.component";
import { BlogDetailComponent } from "../components/blogDetail.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "learn", component: LearnComponent },
    { path: "life", component: LifeComponent },
    { path: "message", component: MessageComponent },
    { path: "blogDetail/:id", component: BlogDetailComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }