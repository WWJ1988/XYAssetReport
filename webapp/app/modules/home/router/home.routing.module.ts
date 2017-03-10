import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "../home.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { BussinessComponent } from "../bussiness/bussiness.component";
import { StoreComponent } from "../store/store.component";
import { ContactComponent } from "../contact/contact.component";

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        children: [
            { path: "homedashboard", component: DashboardComponent },
            { path: "homebussiness", component: BussinessComponent },
            { path: "homestore", component: StoreComponent },
            { path: "homecontact", component: ContactComponent },
            { path: "", component: DashboardComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }