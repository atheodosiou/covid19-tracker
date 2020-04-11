import { Component, OnInit } from "@angular/core";
import { CovidService } from "../../services/covid.service";
import { CountryHistoricalData, Timeline } from '../../models/historical';

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.scss"],
})
export class AnalyticsComponent implements OnInit {
  constructor(private covidService: CovidService) {}

  ngOnInit() {
  }
}
