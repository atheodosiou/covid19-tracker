import { Component, OnInit } from "@angular/core";
import { CovidService } from "src/app/shared/services/covid.service";
import { Country } from "src/app/shared/models/country";
import { TypeaheadOrder } from "ngx-bootstrap/typeahead";
import {
  convertTimelineToDataset,
  createChartLabels,
} from "../global-historical/global-historical.component";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Color, Label } from "ng2-charts";
import * as pluginAnnotations from "chartjs-plugin-annotation";
@Component({
  selector: "country-historical",
  templateUrl: "./country-historical.component.html",
  styleUrls: ["./country-historical.component.scss"],
})
export class CountryHistoricalComponent implements OnInit {
  constructor(private covidService: CovidService) {}
  countries: Country[];
  sortConfig: TypeaheadOrder = {
    direction: "desc",
  };
  casesData: any[] = [];
  deathsData: any[] = [];
  recoveredData: any[] = [];
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: "y-axis-0",
          position: "left",
        },
        {
          id: "y-axis-1",
          position: "right",
          // gridLines: {
          //   color: rgba(255,0,0,0.3),
          // },
          // ticks: {
          //   fontColor: 'blue',
          // }
        },
      ],
    },
    annotation: {
      annotations: [
        {
          type: "line",
          mode: "vertical",
          scaleID: "x-axis-0",
          value: "March",
          borderColor: "orange",
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: "orange",
            content: "LineAnno",
          },
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    {
      // Cases
      backgroundColor: "rgba(173, 216, 230, 0.7)",
      borderColor: "rgba(173, 216, 230,1)",
      pointBackgroundColor: "rgba(173, 216, 230,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(173, 216, 230,0.8)",
    },
    {
      // Deaths
      backgroundColor: "rgba(255, 0, 0, 0.7)",
      borderColor: "rgba(255, 0, 0,1)",
      pointBackgroundColor: "rgba(255, 0, 0,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(255, 0, 0,1)",
    },
    {
      // Recovered
      backgroundColor: "rgba(32, 178, 170, 0.7)",
      borderColor: "rgba(32, 178, 170, 1)",
      pointBackgroundColor: "rgba(32, 178, 170,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(32, 178, 170,0.8)",
    },
  ];
  public lineChartLegend = true;
  public lineChartType = "line";
  public lineChartPlugins = [pluginAnnotations];

  ngOnInit() {
    this.covidService.getCountries().subscribe(
      (countries) => {
        console.log(countries);
        this.countries = countries;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  onCountrySelect(selected: any) {
    console.log(selected.item);
    this.covidService
      .getHistoricalDataByCountry(selected.item.alpha2Code)
      .subscribe(
        (data) => {
          this.lineChartLabels = createChartLabels(data.timeline);
          if (this.lineChartData?.length) {
            this.lineChartData = [];
            this.casesData = [];
            this.deathsData = [];
            this.recoveredData = [];
          }
          this.lineChartData = convertTimelineToDataset(
            data.timeline,
            this.casesData,
            this.deathsData,
            this.recoveredData
          );
          console.log(this.lineChartData);
        },
        (error) => console.error(error)
      );
  }
}
