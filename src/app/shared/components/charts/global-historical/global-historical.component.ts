import { Component, OnInit } from "@angular/core";
import { CovidService } from "src/app/shared/services/covid.service";
import { Timeline } from "src/app/shared/models/historical";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Color, Label } from "ng2-charts";
import * as pluginAnnotations from "chartjs-plugin-annotation";
import { GlobalHistoricalChartOptions } from './chart.options';

@Component({
  selector: "global-historical",
  templateUrl: "./global-historical.component.html",
  styleUrls: ["./global-historical.component.scss"],
})
export class GlobalHistoricalComponent implements OnInit {
  constructor(private covidService: CovidService) {}
  data: Timeline;
  cases: boolean = true;
  deaths: boolean = true;
  recovered: boolean = true;

  casesData: number[] = [];
  deathsData: number[] = [];
  recoveredData: number[] = [];

  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  public lineChartOptions=GlobalHistoricalChartOptions;
  public lineChartColors: Color[] = [
    {
      // Recovered
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
    this.covidService.getGlobalHistoricalData().subscribe(
      (data) => {
        this.lineChartData = convertTimelineToDataset(data,this.casesData,this.deathsData,this.recoveredData);
        this.lineChartLabels = createChartLabels(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  
}

export function createChartLabels(timeline: Timeline): Label[] {
  const label: Label[] = [];
  Object.keys(timeline["cases"]).forEach((key) => {
    label.push(key);
  });
  return label;
}

export function convertTimelineToDataset(timeline: Timeline, casesData,deathsData,recoveredData): ChartDataSets[] {
  Object.keys(timeline).forEach((attr1) => {
    if (attr1 === "cases") {
      Object.keys(timeline[attr1]).forEach((key) => {
        casesData.push(timeline[attr1][key]);
      });
    }
    if (attr1 === "deaths") {
      Object.keys(timeline[attr1]).forEach((key) => {
       deathsData.push(timeline[attr1][key]);
      });
    }
    if (attr1 === "recovered") {
      Object.keys(timeline[attr1]).forEach((key) => {
        recoveredData.push(timeline[attr1][key]);
      });
    }
  });

  return [
    { data: casesData, label: "Confirmed" ,order:3},
    { data: deathsData, label: "Deaths" ,order:1},
    { data: recoveredData, label: "Recovered",order:2 },
  ];
}
