import { Component, OnInit, Input } from "@angular/core";
import { CovidService } from "../../services/covid.service";

@Component({
  selector: "country-list",
  templateUrl: "./country-list.component.html",
  styleUrls: ["./country-list.component.scss"],
})
export class CountryListComponent {
  constructor(private covidService: CovidService) {}
  countries: any[];
  @Input() set data(value: any) {
    this.countries = this.convertObjectToArray(value);
    console.log(this.countries)
  }

  private convertObjectToArray(obj: any): any[] {
    const data = [];
    Object.keys(obj).forEach((key) => {
      data.push({ country: key, details: obj[key] });
    });
    return data;
  }
}
