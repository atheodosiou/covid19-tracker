import { Component, OnInit } from "@angular/core";
import { CovidService } from "src/app/shared/services/covid.service";
import { Timeline } from "src/app/shared/models/historical";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Color, BaseChartDirective, Label } from "ng2-charts";
import * as pluginAnnotations from "chartjs-plugin-annotation";

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
    this.covidService.getGlobalHistoricalData().subscribe(
      (data) => {
        this.lineChartData = this.convertTimelineToDataset(data);
        this.lineChartLabels = this.createChartLabels(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private convertTimelineToDataset(timeline: Timeline): ChartDataSets[] {
    Object.keys(timeline).forEach((attr1) => {
      if (attr1 === "cases") {
        Object.keys(timeline[attr1]).forEach((key) => {
          this.casesData.push(timeline[attr1][key]);
        });
      }
      if (attr1 === "deaths") {
        Object.keys(timeline[attr1]).forEach((key) => {
          this.deathsData.push(timeline[attr1][key]);
        });
      }
      if (attr1 === "recovered") {
        Object.keys(timeline[attr1]).forEach((key) => {
          this.recoveredData.push(timeline[attr1][key]);
        });
      }
    });

    return [
      { data: this.casesData, label: "Cases" ,order:3},
      { data: this.deathsData, label: "Deaths" ,order:1},
      { data: this.recoveredData, label: "Recovered",order:2 },
    ];
  }

  private createChartLabels(timeline: Timeline): Label[] {
    const label: Label[] = [];
    Object.keys(timeline["cases"]).forEach((key) => {
      label.push(key);
    });
    return label;
  }
}
