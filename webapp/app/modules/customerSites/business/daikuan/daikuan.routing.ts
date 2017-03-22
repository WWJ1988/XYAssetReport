import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DaiKuanComponent } from "./daikuan.component";
import { DaiKuanNewComponent } from "./new/daikuan-new.component";

const routes: Routes = [
    {
        path: "daikuan",
        component: DaiKuanComponent,
        children: [
            { path: "", redirectTo: "/daikuan/new", pathMatch: "full" },
            { path: "new", component: DaiKuanNewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DaikuanRoutingModule { }