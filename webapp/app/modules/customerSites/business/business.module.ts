import { NgModule } from "@angular/core";

import { OAModule } from "./OA/oa.module";
import { DaikuanModule } from "./daikuan/daikuan.module";

@NgModule({
    imports: [OAModule, DaikuanModule],
    exports: [OAModule, DaikuanModule]
})
export class CustomerSideBusinessModule { }