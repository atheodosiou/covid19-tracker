import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as _ from "lodash";
@Injectable({
  providedIn: "root",
})
export class CovidService {
  private covidDataUrl = "https://corona.lmao.ninja/v2/jhucsse";
  constructor(private http: HttpClient) {}

  getGroupedData(): Observable<any> {
    return this.http
      .get(this.covidDataUrl)
      .pipe(map((x) => _.groupBy(x, "country")));
  }

  getData(): Observable<any> {
    return this.http.get(this.covidDataUrl);
  }
}
