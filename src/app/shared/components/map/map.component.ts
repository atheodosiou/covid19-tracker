import { Component, OnInit, Input } from "@angular/core";
import * as L from "leaflet";
import { CovidService } from '../../services/covid.service';

@Component({
  selector: "map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  @Input() set data(value:any[]){
   if(value){
    this.mapData=value;
    // console.log(this.mapData)
   }
  }

  constructor(private covidService:CovidService) {}
  map: L.Map;
  private mapData:any[];
  center: L.LatLng = new L.LatLng(37.2532002, 5.8725402);
  ngOnInit() {
    setTimeout(() => {
      this.initMap().then(() => {
        //Use lowdash to groupby country!!!
        console.log(this.mapData)
        // lat and lng could be null!!
      });
    }, 100);
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
    const layers = {
      Light: OpenStreetMap_DE,
      Dark: Stadia_AlidadeSmoothDark,
    };
    return new Promise<any>((fullfiled, rejected) => {
      this.map = L.map("map", {
        center: this.center,
        zoom: 3,
        layers: [Stadia_AlidadeSmoothDark, OpenStreetMap_DE],
      });
      L.control.layers(layers).addTo(this.map);
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
            fullfiled(null)
          }
        );
      } else {
        rejected("Geolocation is not supported by this browser.");
      }
    });
  }

  private addGeolocationToData(data:any[],countries:any[]){
    let found = 0;
    data.forEach(item=>{
      countries.forEach(c=>{
        if(c.country.toUpperCase().subStr(item.country.toUpperCase())){
          found+=1;
         }else{
           console.log(`${item.country.toUpperCase()} is not included in countries`);
         }
      })      
    })
    return found;
  }
}
