import { Component, OnInit } from "@angular/core";
import { CovidService } from "../../services/covid.service";
import { convertObjectToArray } from '../country-list/country-list.component';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private covidService: CovidService) {}
  confirmed: number = 0;
  deaths: number = 0;
  recovered: number = 0;
  active: number = this.confirmed - this.deaths - this.recovered;
  totalCountries: number = 0;
  data: any[];
  countries: any;
  countryList:any[];
  selectedCountry: any;

  ngOnInit() {
    this.covidService.getData().subscribe(
      (res) => {
        this.data = res;
        this.data.forEach((i) => {
          this.confirmed += Number(i.stats.confirmed);
          this.deaths += Number(i.stats.deaths);
          this.recovered += Number(i.stats.recovered);
          this.active = this.confirmed - this.deaths - this.recovered;
          this.totalCountries += 1;
        });
      },
      (error) => {
        console.log(error);
      }
    );
    this.covidService.getGroupedData().subscribe(
      (res) => {
        this.countries = res;
        
        this.countryList = convertObjectToArray(res);
        console.log(this.countryList);
      },
      (error) => console.error(error)
    );
  }

  onCountrySelect(latlng: any) {
    this.selectedCountry = latlng;
  }
}
