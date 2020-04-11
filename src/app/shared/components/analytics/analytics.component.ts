import { Component, OnInit } from "@angular/core";
import { CovidService } from "../../services/covid.service";
import { CountryHistoricalData } from '../../models/historical';

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.scss"],
})
export class AnalyticsComponent implements OnInit {
  constructor(private covidService: CovidService) {}

  ngOnInit() {
    this.covidService.getCountries().subscribe(countries=>{console.log(countries)},error=>{console.error(error)})
    this.covidService.getHistoricalDataByCountry('GR').subscribe(
      (data:CountryHistoricalData)=>{
        console.log(data)
      },error=>{
        console.error(error)
      });
  }

  getCountries(){
    this.covidService.getCountries().subscribe(countries=>{console.log(countries)},error=>{console.error(error)})
  }
}
