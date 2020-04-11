import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import * as _ from "lodash";
import { Country } from "../models/country";
import { CountryHistoricalData, Timeline } from "../models/historical";

enum Endpoints {
  JHUCSSE = "jhucsse",
  HISTORICAL = "historical",
  HISTORICAL_ALL="historical/all?lastdays=all",
  COUNTRIES = "jhucsse/counties",
}
@Injectable({
  providedIn: "root",
})
export class CovidService {
  private baseUrl = "https://corona.lmao.ninja/v2/";
  private countriesUrl =
    "https://restcountries.eu/rest/v2/all?fields=name;alpha2Code";

  private countries: Country[];

  constructor(private http: HttpClient) {}

  getGroupedData(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}${Endpoints.JHUCSSE}`)
      .pipe(map((x) => _.groupBy(x, "country")));
  }

  getData(): Observable<any> {
    return this.http.get(`${this.baseUrl}${Endpoints.JHUCSSE}`);
  }

  getCountries(): Observable<Country[]> {
    if (!this.countries || this.countries.length === 0) {
      return this.http
        .get<Country[]>(`${this.countriesUrl}`)
        .pipe(tap((data: Country[]) => (this.countries = data)));
    }
    return of(this.countries);
  }

  getHistoricalDataByCountry(
    countryCode: string
  ): Observable<CountryHistoricalData> {
    return this.http.get<CountryHistoricalData>(
      `${this.baseUrl}${Endpoints.HISTORICAL}/${countryCode}?lastdays=all`
    );
  }

  getGlobalHistoricalData():Observable<Timeline>{
    return this.http.get<Timeline>(
      `${this.baseUrl}${Endpoints.HISTORICAL_ALL}`
    );
  }
}
