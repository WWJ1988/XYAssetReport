import { Component } from "@angular/core";
import { CarouselConfig } from 'ng2-bootstrap';

import { DaikuanDataService } from "../services/dataService";

@Component({
    moduleId: __filename,
    selector: "tlr-daikuan-new",
    templateUrl: "./daikuan-new.component.html",
    styleUrls: ["./daikuan-new.component.css"],
    providers: [{ provide: CarouselConfig, useValue: { interval: 2000 } }]
})
export class DaiKuanNewComponent {

}