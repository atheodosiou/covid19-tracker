import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CovidService } from "../../services/covid.service";
import * as countryList from "../../../../assets/data/countries.json";
@Component({
  selector: "country-list",
  templateUrl: "./country-list.component.html",
  styleUrls: ["./country-list.component.scss"],
})
export class CountryListComponent {
  constructor(private covidService: CovidService) {}
  countries: any[];
  @Input() set data(value: any) {
    this.countries = convertObjectToArray(value);
    this.countries.forEach((item) => {
      this.getFlag(item.country);
    });
  }

  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
  
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

  getFlag(name: string) {
    let flags: any[] = (countryList as any).countries;
    const found = flags.find((x) => {
      return (
        x.name.toLowerCase().includes(name.toLowerCase()) ||
        name.toLowerCase().includes(x.name.toLowerCase())
      );
    });
    if (found && found.code && found.code!=='CS') {
      return `https://www.countryflags.io/${found.code.toLowerCase()}/flat/64.png`;
    } else {
      return "assets/icons/flag.png";
    }
    //
    // console.log('Actual:',name,'Found:',found)
  }
}

export function convertObjectToArray(obj: any): any[] {
  const data = [];
  Object.keys(obj).forEach((key) => {
    data.push({ country: key, details: obj[key] });
  });
  return data;
}
