import { NgModule } from "@angular/core";

import { OAModule } from "./OA/oa.module";

@NgModule({
    imports: [OAModule],
    exports: [OAModule]
})
export class CustomerSideBusinessModule { }