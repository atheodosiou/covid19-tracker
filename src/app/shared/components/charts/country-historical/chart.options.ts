import { ChartOptions } from "chart.js";
export const CountryHistoricalChartOptions: ChartOptions & {
  annotation: any;
} = {
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
      },
    ],
  },
  title: {
    text: "Total number of cases by country",
    display: true,
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
