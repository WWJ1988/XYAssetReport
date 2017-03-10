import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { OAComponent } from "./oa.component";
import { OAHomeComponent } from "./home/oa.home.component";

const routes: Routes = [
    {
        path: "oa",
        component: OAComponent,
        children: [
            { path: "", redirectTo: "/oa/home", pathMatch: "full" },
            { path: "home", component: OAHomeComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OARoutingModule { }