import { Component, OnInit } from "@angular/core";

import { DaikuanDataService } from "../../services/dataService";

@Component({
    moduleId: module.id,
    selector: "tlr-brand-widget",
    templateUrl: "./brandwidget.component.html",
    styleUrls: ["brandwidget.component.css"]
})
export class BrandWidgetComponent implements OnInit {
    brands: string[];
    prices: [[number, number]];
    downPayments: [[number, number]];
    monthlyPayments: [[number, number]];
    types: string[];
    brandDetails: DaikuanModels.StringKeyValue<string[]>;
    brandDetailKeySets: [string[]];

    constructor(private dataService: DaikuanDataService) {

    }

    ngOnInit(): void {
        this.brands = this.dataService.getBrands();
        this.prices = this.dataService.getPrices();
        this.downPayments = this.dataService.getDownPayments();
        this.monthlyPayments = this.dataService.getMonthlyPayments();
        this.types = this.dataService.getTypes();
        this.brandDetails = this.dataService.getBrandDetails();
        let keys = Object.keys(this.brandDetails);
        this.brandDetailKeySets = [keys.splice(0, 7)];
        this.brandDetailKeySets.push(keys.splice(0, 8));
        this.brandDetailKeySets.push(keys.splice(0));
    }
}