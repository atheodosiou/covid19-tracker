import { Component, OnInit } from "@angular/core";
import { CovidService } from "../../services/covid.service";
import { convertObjectToArray } from '../country-list/country-list.component';
import { GoogleAnalyticsService } from '../../services/googleAnalytics.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private covidService: CovidService, private googleAnalyticsService:GoogleAnalyticsService) {}
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
      },
      (error) => console.error(error)
    );
  }

  onCountrySelect(latlng: any) {
    this.selectedCountry = latlng;
  }

  onCountrySelectMobile(region){
    let latlng={lat:region.coordinates.latitude,lng:region.coordinates.longitude};
    this.selectedCountry=latlng;
    
    //Google analytics
    this.googleAnalyticsService.eventEmitter(
      "Country Clicked",
      "Country-List",
      "click",
      region.province ? region.province : region.country,
      1
    );
  }
}
