import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CovidService {
  private covidDataUrl = "https://pomber.github.io/covid19/timeseries.json";
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.covidDataUrl).pipe(
      map((result) => {
        const covidData: any[] = [];
        Object.keys(result).forEach((key) => {
          const item = {
            country: key,
            data: result[key],
            total:{
              confirmed:result[key][result[key].length - 1].confirmed,
              deaths:result[key][result[key].length - 1].deaths,
              recovered:result[key][result[key].length - 1].recovered
            }
          };
          covidData.push(item);
        });
        return covidData;
      })
    );
  }
}
