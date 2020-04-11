export interface CountryHistoricalData {
  country: string;
  provinces: string[];
  timeline: Timeline;
}

export interface Timeline {
  cases: any;
  deaths: any;
  recovered: any;
}
