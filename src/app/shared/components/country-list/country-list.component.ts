import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
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
    console.log(this.countries);
  }

  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
  private convertObjectToArray(obj: any): any[] {
    const data = [];
    Object.keys(obj).forEach((key) => {
      data.push({ country: key, details: obj[key] });
    });
    return data;
  }
  selectChild(data: any) {
    if (
      data &&
      data.coordinates &&
      data.coordinates.latitude &&
      data.coordinates.longitude
    ) {
      this.onSelect.emit({
        lat: data.coordinates.latitude,
        lng: data.coordinates.longitude,
      });
    }
  }
}
