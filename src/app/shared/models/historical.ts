export interface CountryHistoricalData {
  country: string;
  provinces: string[];
  timeline: Timeline;
}

export interface Timeline {
  cases: { string: number }[];
  deaths: { string: number }[];
  recovered: { string: number }[];
}
