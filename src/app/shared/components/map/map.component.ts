import { Component, OnInit, Input } from "@angular/core";
import * as L from "leaflet";
import 'leaflet.heat';
import { CovidService } from "../../services/covid.service";

@Component({
  selector: "map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  @Input() set data(value: any[]) {
    if (value) {
      this.mapData = value;
      console.log(this.mapData);      
    }
  }

  constructor(private covidService: CovidService) {}
  map: L.Map;
  private mapData: any[];
  center: L.LatLng = new L.LatLng(37.2532002, 5.8725402);
  ngOnInit() {
    setTimeout(() => {
      this.initMap().then(() => {
        //Use lowdash to groupby country!!!
        console.log(this.mapData);
        // lat and lng could be null!!
      });
    }, 300);
  }

  private initMap(): Promise<any> {
    const Stadia_AlidadeSmoothDark = L.tileLayer(
      "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 20,
        attribution:
          '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      }
    );

    const OpenStreetMap_DE = L.tileLayer(
      "https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png",
      {
        maxZoom: 18,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          
      }
    );

    // const totalConfirmed=this.mapData.map(x=>x+=x.stats.confirmed);
    // console.log('TOTAL CASES:',totalConfirmed);

    const heatData = this.mapData.map(point=>{
    return [point.coordinates.latitude,point.coordinates.longitude,0.5];
    });
    console.log('HEAT DATA',heatData);
    const heatLayer=L.heatLayer(heatData as L.HeatLatLngTuple[],{blur:15,gradient:{0.4: 'blue', 0.65: 'lime', 1: 'red'}});
    const layers = {
      Light: OpenStreetMap_DE,
      Dark: Stadia_AlidadeSmoothDark,
      Heatmap:heatLayer
    };
    return new Promise<any>((fullfiled, rejected) => {
      this.map = L.map("map", {
        center: this.center,
        zoom: 3,
        layers: [Stadia_AlidadeSmoothDark, OpenStreetMap_DE,heatLayer],

      });
      L.control.layers(layers).addTo(this.map);
      L.control.scale().addTo(this.map);
      
      //Markers
      // this.mapData.forEach((item) => {
      //   L.marker([item.coordinates.latitude, item.coordinates.longitude], {
      //     icon: this.getIcon(item.stats.confirmed),
      //   }).addTo(this.map);
      // });
      
      fullfiled();
    });
  }

  private getCurrentPosition(): Promise<any> {
    return new Promise<any>((fullfiled, rejected) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (success) => {
            fullfiled(success);
          },
          (fail) => {
            // rejected(fail);
            fullfiled(null);
          }
        );
      } else {
        rejected("Geolocation is not supported by this browser.");
      }
    });
  }

  private toGeoJson(data: any[]): any[] {
    return data.map((x) => {
      return {
        type: "Feature",
        properties: {
          country: x.country,
          province: x.province,
          stats: x.stats,
          updatedAt: x.updatedAt,
        },
        geometry: {
          type: "Point",
          coordinates: [x.coordinates.latitude, x.coordinates.longitude],
        },
      };
    });
  }

  private getIcon(value: number): L.Icon {
    if (value <= 9) {
      return L.icon({
        iconUrl: "../../../../assets/icons/1.png",
        iconSize: [8, 8],
        iconAnchor: [0, 4],
      });
    } else if (value >= 10 && value <= 99) {
      return L.icon({
        iconUrl: "../../../../assets/icons/2.png",
        iconSize: [10, 10],
        iconAnchor: [0, 5],
      });
    } else if (value >= 10 && value <= 99) {
      return L.icon({
        iconUrl: "../../../../assets/icons/3.png",
        iconSize: [12, 12],
        iconAnchor: [0, 6],
      });
    } else if (value >= 100 && value <= 999) {
      return L.icon({
        iconUrl: "../../../../assets/icons/4.png",
        iconSize: [14, 14],
        iconAnchor: [0, 7],
      });
    } else if (value >= 1000 && value <= 9999) {
      return L.icon({
        iconUrl: "../../../../assets/icons/5.png",
        iconSize: [16, 16],
        iconAnchor: [0, 8],
      });
    } else if (value >= 10000) {
      return L.icon({
        iconUrl: "../../../../assets/icons/6.png",
        iconSize: [18, 18],
        iconAnchor: [0, 9],
      });
    }
  }
}
