import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: "tlr-oa-login",
    templateUrl: "./oa-login.component.html",
    styleUrls: ["./oa-login.component.css"]
})
export class OALoginComponent {
    user: OAModels.User = { userName: "", password: "" };
    errorMessage: string = "";

    constructor(private router: Router) {

    }

    login(): void {
        this.router.navigate(["/oa/home"]);
    }
}