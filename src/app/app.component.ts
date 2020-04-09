import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

declare let gtag: Function;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "covid19";
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag("config", "UA-140798817-3", {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }
}
